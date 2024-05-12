import React from "react";
import styles from "./FavoriteCard.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const FavoriteCard: React.FC = () => {


    return (
        <div className={styles.card}>
            <img
                src="https://picsum.photos/350/180" alt="Card"
                className={styles.cardImage} />
            <div className={styles.contentCard}>
                <div className={styles.titleAndIcon}>
                    <div className={styles.cardTitle}>Une ressource</div>
                    <FontAwesomeIcon icon={faEllipsisV} className={styles.icon} color="black" />
                </div>
                <div className={`${styles.contentResource} ${styles.threeLines}`}>Une ressource peut être considérée comme tout ce qui peut être exploité ou utilisé pour atteindre un objectif spécifique. Cela peut inclure des ressources naturelles telles que l'eau et les minéraux, des ressources financières comme l'argent, des ressources humaines comme les compétences et les connaissances, ou même des ressources technologiques telles que les logiciels et les équipements.
                <br/>
                Une ressource peut être considérée comme tout ce qui peut être exploité ou utilisé pour atteindre un objectif spécifique. Cela peut inclure des ressources naturelles telles que l'eau et les minéraux, des ressources financières comme l'argent, des ressources humaines comme les compétences et les connaissances, ou même des ressources technologiques telles que les logiciels et les équipements.
                </div>
            </div>
        </div>
    );
};



export default FavoriteCard;
