import React from 'react';
import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {

    return <div className="flex-fill d-flex align-items-center justify-content-center">
        <form className={`${styles.form} d-flex flex-column card p-20`}>
            <h2 className="mb-10">Réinitialiser mon mot de passe</h2>
            <div className="mb-10 d-flex flex-column">
                <label htmlFor="password">Nouveau mot de passe</label>
                <input type="password" />
            </div>
            <div className="mb-10 d-flex flex-column">
                <label htmlFor="password">Confirmer le mot de passe</label>
                <input type="password" />
            </div>
            <div>
                <button className="btn btn-primary">
                    Valider
                </button>
            </div>
        </form>
    </div>
};

export default ResetPassword;
