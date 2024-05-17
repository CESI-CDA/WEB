import React from 'react';
import styles from "./HeaderArchive.module.scss";
import { IFavorite } from 'interfaces/favorite.interface';

const HeaderArchive: React.FC<IFavorite> = ({ title, onBackPress }) => {

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.titleandarrowheader}>
                <button className={styles.button} onClick={handleBackPress}>
                    <i className={`fa-solid fa-arrow-left ${styles.icon}`} style={{ color: "black" }}></i>
                </button>
                <div className={styles.title}>{title}</div>
            </div>
            <button className={styles.button}>
                <i className={`fa-solid fa-ellipsis ${styles.icon}`} style={{ color: "black" }}></i>
            </button>
        </div>
    );
}

export default HeaderArchive;