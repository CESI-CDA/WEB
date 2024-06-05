import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../apis/users';
import styles from "./ForgotPassword.module.scss";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await forgotPassword(email);
            navigate('/emailsent'); 
        } catch (error) {
            setError("Erreur lors de l'envoi de l'email de réinitialisation de mot de passe.");
        } finally {
            setLoading(false);
        }
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
        </div>
    );
};

export default ForgotPassword;
