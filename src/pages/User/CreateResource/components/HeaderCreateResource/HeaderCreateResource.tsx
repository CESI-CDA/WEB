import React from 'react';
import styles from "./HeaderCreateResource.module.scss";


const HeaderCreateResource: React.FC<{ title: string }> = ({ title }) => {

    return (
        <div className={styles.header}>
          
                <div className={styles.title}>{title}</div>
           
        </div>
    );
}

export default HeaderCreateResource;