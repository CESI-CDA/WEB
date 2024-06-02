import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./EmailSent.module.scss";

const EmailSent: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-fill d-flex align-items-center justify-content-center">
            <div className={`${styles.message} card p-20`}>
                <h2 className="mb-10">Email de réinitialisation envoyé</h2>
                <p>
                    Un email avec les instructions pour réinitialiser votre mot de passe a été envoyé à votre adresse email.
                    Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.
                </p>
                <button className="btn btn-primary" onClick={() => navigate("/login")}>
                    Retour à la connexion
                </button>
            </div>
        </div>
    );
};

export default EmailSent;
