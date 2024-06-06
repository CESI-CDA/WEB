import React from 'react';
import styles from "./HeaderFavorite.module.scss";


const HeaderFavorite: React.FC<{ title: string }> = ({ title }) => {

    return (
        <div className={styles.header}>
            <div className={styles.titleandarrowheader}>
                <div className={styles.title}>{title}</div>
            </div>
        </div>
    );
}

export default HeaderFavorite;