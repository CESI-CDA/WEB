import React from 'react';
import styles from "./Archive.module.scss";
import HeaderArchive from './components/HeaderArchive/HeaderArchive';
import ArchiveCard from './components/ArchiveCard/ArchiveCard';



const Archive: React.FC = () => {

    return (
        <div className={`card flex-fill d-flex flex-column p-30 mb-30 ${styles.contentCard}`}>
            <div className={styles.header}>
                <HeaderArchive title="Mes archives"/>
            </div>
            <div className={styles.body}>
                <ArchiveCard />
                <ArchiveCard />
                <ArchiveCard />
                <ArchiveCard />
                <ArchiveCard />
                <ArchiveCard />
            </div>
        </div>
    );
};

export default Archive;