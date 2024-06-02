import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            setSuccess("");
            return;
        }

        try {
            const response = await fetch('https://api.example.com/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                setSuccess("Votre mot de passe a été réinitialisé avec succès.");
                setError("");
                setPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                const data = await response.json();
                setError(data.message || "Une erreur s'est produite");
                setSuccess("");
            }
        } catch (error) {
            setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
            setSuccess("");
        }
    }

    return (
        <div className="flex-fill d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className={`${styles.form} d-flex flex-column card p-20`}>
                <h2 className="mb-10">Réinitialiser mon mot de passe</h2>
                <div className="mb-10 d-flex flex-column">
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={error ? 'is-invalid' : ''}
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


