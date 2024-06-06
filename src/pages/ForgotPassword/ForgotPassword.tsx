import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../apis/users';
import styles from "./ForgotPassword.module.scss";
import Modal from "../../components/Modal/Modal";


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await forgotPassword(email);
            setIsModalOpen(true);
        } catch (error) {
            setError("Erreur lors de l'envoi de l'email de réinitialisation de mot de passe.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/login");
    };

    return (
        <div className="flex-fill d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className={`${styles.form} d-flex flex-column card p-30`}>
                <h2 className="mb-20">Mot de passe oublié</h2>
                <div className="mb-20 d-flex flex-column">
                    <label htmlFor="email" className='mb-20'>Saisissez votre adresse e-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                {error && <div className="text-danger mt-2">{error}</div>}
                <div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Email de réinitialisation envoyé</h2>
                <p>Un email avec les instructions pour réinitialiser votre mot de passe a été envoyé à votre adresse email.<br/>
                    Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.</p>
            </Modal>
        </div>
    );
};

export default ForgotPassword;
