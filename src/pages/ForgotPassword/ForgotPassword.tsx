import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./ForgotPassword.module.scss";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('https://api.example.com/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                navigate("/email-sent");
            } else {
                const data = await response.json();
                setError(data.message || "Une erreur s'est produite");
            }
        } catch (error) {
            setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }

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
                    />
                </div>
                {error && <div className="text-danger mt-2">{error}</div>}
                <div>
                    <button type="submit" className="btn btn-primary">
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;


