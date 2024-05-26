import React from 'react';
import styles from "./Favorite.module.scss";
import HeaderFavorite from './components/HeaderFavorite/HeaderFavorite';
import FavoriteCard from './components/FavoriteCard/FavoriteCard';



const Favorite: React.FC = () => {

    return (
     
            <div className={`card flex-fill d-flex flex-column p-30 mb-30 ${styles.contentCard}`}>
                <div className={styles.header}>
                    <HeaderFavorite title="Mes favoris" onBackPress={() => console.log('Retour en arrière effectué')} />
                </div>
                <div className={styles.body}>
                <FavoriteCard/>
                <FavoriteCard/>
                <FavoriteCard/>
                <FavoriteCard/>
                <FavoriteCard/>
                </div>
              
            </div>
     
    );
};

export default Favorite;