import React from 'react';
import styles from "./Favorite.module.scss";
import HeaderFavorite from './components/HeaderFavorite';


const Favorite: React.FC = () => {

    return (
        <div className={`flex-fill container d-flex flex-column p-20`}>
            <div className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}>
                <div className={styles.header}>
                    <HeaderFavorite title="Mes favoris" onBackPress={() => console.log('Retour en arrière effectué')} />
                </div>
            </div>
        </div>
    );
};

export default Favorite;