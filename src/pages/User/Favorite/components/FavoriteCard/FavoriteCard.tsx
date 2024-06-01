import React from "react";
import styles from "./FavoriteCard.module.scss";
import { IRessource } from "interfaces";

const FavoriteCard: React.FC<{ ressource: IRessource }> = ({ ressource }) => {
    return (
        <div className={styles.card}>
            <img
                src={ressource.image} alt="Card" 
                className={styles.cardImage} />
            <div className={styles.contentCard}>
                <div className={styles.titleAndIcon}>
                    <div className={styles.cardTitle}>{ressource.title}</div>
                    <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`} style={{ color: "black" }}></i>
                </div>
                <div className={`${styles.contentResource} ${styles.threeLines}`}>
                    {ressource.contenu_res}
                </div>
            </div>
        </div>
    );
};
export default FavoriteCard;