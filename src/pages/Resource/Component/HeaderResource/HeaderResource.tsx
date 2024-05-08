import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faHeart, faArchive } from '@fortawesome/free-solid-svg-icons'; // Importez les icônes nécessaires
import styles from "./HeaderResource.module.scss";

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
            <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} color="white" />
            <div className={styles.add}>
                <div>
                    {/* Utiliser la couleur blanche si l'icône n'est pas rempli, sinon utilisez la couleur violette */}
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} color={isHeartFilled ? "#6E5BE2" : "white"} onClick={handleHeartClick} />
                </div>
                <div>
                    {/* Utiliser la couleur blanche si l'icône n'est pas rempli, sinon utilisez la couleur violette */}
                    <FontAwesomeIcon icon={faArchive} className={styles.icon} color={isArchiveFilled ? "#6E5BE2" : "white"} onClick={handleArchiveClick} />
                </div>
            </div>
        </div>
    );
}

export default HeaderResource;
