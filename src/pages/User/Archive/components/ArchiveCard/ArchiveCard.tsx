import React from "react";
import styles from "./ArchiveCard.module.scss";

const ArchiveCard: React.FC = () => {


    return (
        <div className={styles.card}>
            <img
                src="https://picsum.photos/350/180" alt="Card"
                className={styles.cardImage} />
            <div className={styles.contentCard}>
                <div className={styles.titleAndIcon}>
                    <div className={styles.cardTitle}>Une ressource</div>
                    <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`} style={{ color: "black" }}></i>
                </div>
                <div className={`${styles.contentResource} ${styles.threeLines}`}>Une ressource peut être considérée comme tout ce qui peut être exploité ou utilisé pour atteindre un objectif spécifique. Cela peut inclure des ressources naturelles telles que l'eau et les minéraux, des ressources financières comme l'argent, des ressources humaines comme les compétences et les connaissances, ou même des ressources technologiques telles que les logiciels et les équipements.
                <br/>
                Une ressource peut être considérée comme tout ce qui peut être exploité ou utilisé pour atteindre un objectif spécifique. Cela peut inclure des ressources naturelles telles que l'eau et les minéraux, des ressources financières comme l'argent, des ressources humaines comme les compétences et les connaissances, ou même des ressources technologiques telles que les logiciels et les équipements.
                </div>
            </div>
        </div>
    );
};

export default ArchiveCard;
