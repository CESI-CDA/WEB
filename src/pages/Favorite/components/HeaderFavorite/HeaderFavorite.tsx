import React from 'react';
import styles from "./HeaderFavorite.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import  {IFavorite}  from 'interfaces/favorite.interface';

const HeaderFavorite: React.FC<IFavorite> = ({ title, onBackPress }) => {

    const handleBackPress = () => {
        if (onBackPress) {
          onBackPress();
        }
      };
    
    return (
        <div className={styles.header}>
            <div className={styles.titleandarrowheader}>
                <button className={styles.button} onClick={handleBackPress}>
                    <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} color="black" />
                </button>
                <div className={styles.title}>{title}</div>
            </div>
            <button className={styles.button}>
                <FontAwesomeIcon icon={faEllipsisH} className={styles.icon} color="black" />
            </button>
        </div>
    );
}

export default HeaderFavorite;