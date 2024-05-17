import React from 'react';
import styles from "./ForgotPassword.module.scss";

const ForgotPassword: React.FC = () => {

    return <div className="flex-fill d-flex align-items-center justify-content-center">
        <form className={`${styles.form} d-flex flex-column card p-30`}>
            <h2 className="mb-20">Mot de passe oublié</h2>
            <div className="mb-20 d-flex flex-column">
                <label htmlFor="email" className='mb-20'>Saisissez votre adresse e-mail</label>
                <input type="email" />
            </div>
            
            <div>
                <button className="btn btn-primary">
                    Envoyer
                </button>
            </div>
        </form>
    </div>
};

export default ForgotPassword;
