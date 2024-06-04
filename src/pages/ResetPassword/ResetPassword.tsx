import React, { useState, useEffect } from 'react';
import { resetPassword } from '../../apis/users';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        console.log("Token de réinitialisation de mot de passe :", token);
    }, [location.search]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            setSuccess("");
            return;
        }

        try {
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get('token');
            console.log("Token utilisé pour la réinitialisation :", token);
            await resetPassword({ token, email, password, password_confirmation: confirmPassword });
            setSuccess("Votre mot de passe a été réinitialisé avec succès.");
            setError("");
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setError("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
            setSuccess("");
        }
    }

    return (
        <div className="flex-fill d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className={`${styles.form} d-flex flex-column card p-20`}>
                <h2 className="mb-10">Réinitialiser mon mot de passe</h2>
                <div className="mb-10 d-flex flex-column">
                    <label htmlFor="email">Adresse e-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-10 d-flex flex-column">
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={error ? 'is-invalid' : ''}
                        required
                    />
                </div>
                <div className="mb-10 d-flex flex-column">
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={error ? 'is-invalid' : ''}
                        required
                    />
                </div>
                {error && <div className="text-danger mt-2">{error}</div>}
                {success && <div className="text-success mt-2">{success}</div>}
                <div>
                    <button type="submit" className="btn btn-primary">
                        Valider
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
