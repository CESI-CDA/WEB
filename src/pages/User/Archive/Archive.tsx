import React, { useContext, useEffect, useState } from 'react';
import styles from "./Archive.module.scss";
import HeaderArchive from './components/HeaderArchive/HeaderArchive';
import ArchiveCard from './components/ArchiveCard/ArchiveCard';
import { getUserArchives } from "../../../apis/users";
import { IContextAuth, IRessource } from 'interfaces';
import { AuthContext } from "../../../context";
import Loader from "../../../components/Loader/Loader";

const Archive: React.FC = () => {
    const authContext = useContext<IContextAuth | Partial<IContextAuth> | null>(AuthContext);

    if (!authContext) {
        return null;
    }

    const { token, user } = authContext;
    const [archives, setArchives] = useState<IRessource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user && token) {
            const userIdString = user.id.toString();
            getUserArchives(userIdString, token)
                .then(ids => {
                    setArchives(ids);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des favoris:', error);
                    setLoading(false);
                });
        }
    }, [user, token]);

    if (loading) {
        return <Loader />;
    }
    
    return (
        <div className={`card flex-fill d-flex flex-column p-30 mb-30 ${styles.contentCard}`}>
            <div className={styles.header}>
                <HeaderArchive title="Mes archives" />
            </div>
            <div className={styles.body}>
                {archives.map((archive, index) => (
                    <ArchiveCard key={index} ressource={archive} />
                ))}
            </div>
        </div>
    );
};

export default Archive;
