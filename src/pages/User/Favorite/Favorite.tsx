import React, { useContext, useEffect, useState } from 'react';
import styles from "./Favorite.module.scss";
import HeaderFavorite from './components/HeaderFavorite/HeaderFavorite';
import FavoriteCard from './components/FavoriteCard/FavoriteCard';
import { getUserFavorites } from "../../../apis/users";
import { IContextAuth, IRessource } from 'interfaces';
import { AuthContext } from "../../../context";
import Loader from "../../../components/Loader/Loader";


const Favorite: React.FC = () => {
    const authContext = useContext<IContextAuth | Partial<IContextAuth> | null>(AuthContext);
    
    if (!authContext) {
        return null;
    }

    const { token, user } = authContext;
    const [favorites, setFavorites] = useState<IRessource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user && token) {
            const userIdString = user.id.toString();
            getUserFavorites(userIdString, token)
                .then(ids => {
                    setFavorites(ids);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des favoris:', error);
                    setLoading(false)
                });
        }
    }, [user, token]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className={`card flex-fill d-flex flex-column p-30 mb-30 ${styles.contentCard}`}>
            <div className={styles.header}>
                <HeaderFavorite title="Mes favoris" />
            </div>
            <div className={styles.body}>
                {favorites.map((favorite, index) => (
                    <FavoriteCard key={index} ressource={favorite} />
                ))}
            </div>
        </div>
    );
};

export default Favorite;
