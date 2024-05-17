import React, { useState } from 'react';
import styles from "./HeaderResource.module.scss";
import { NavLink } from 'react-router-dom';

const HeaderResource: React.FC = () => {
    // Utilisez l'état local pour suivre si les sont remplis ou non
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isArchiveFilled, setIsArchiveFilled] = useState(false);

    // Gestionnaire d'événements pour basculer entre les états rempli et vide lors du clic sur l'icône
    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const handleArchiveClick = () => {
        setIsArchiveFilled(!isArchiveFilled);
    }
    return (
        <div className={styles.container}>
            <NavLink to="/">
                <i className={`fa-solid fa-chevron-left ${styles.icon}`} style={{ color: "white" }}></i>
            </NavLink>
            <div className={styles.add}>
                <div>
                    <i className={`fa-solid fa-heart ${styles.icon}`}
                        style={{ color: isHeartFilled ? "#6E5BE2" : "white" }}
                        onClick={handleHeartClick}
                    ></i>
                </div>
                <div>
                    <i className={`fa-solid fa-box-archive ${styles.icon}`}
                        style={{ color: isArchiveFilled ? "#6E5BE2" : "white" }}
                        onClick={handleArchiveClick}
                    ></i>
                </div>
            </div>
        </div>
    );
}

export default HeaderResource;
