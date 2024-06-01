import React, { useContext, useEffect, useState } from 'react';
import styles from "./MyResources.module.scss";
import MyResourcesCard from './components/MyResourcesCard/MyResourcesCard';
import HeaderMyResources from './components/HeaderMyResources/HeaderMyResources';
import { getResourcesCreateByUser } from "../../../apis/users";
import { AuthContext } from "../../../context";
import { IContextAuth, IRessource } from 'interfaces';

const MyResources: React.FC = () => {

    const authContext = useContext<IContextAuth | null>(AuthContext);

    if (!authContext) {
        return null;
    }

    const { token, user } = authContext;
    const [myResources, setMyResources] = useState<IRessource[]>([]);

    useEffect(() => {
        if (user && token) {
            const userIdString = user.id.toString();
            getResourcesCreateByUser(userIdString, token)
                .then(resources => {
                    setMyResources(resources);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des ressources de l\'utilisateur:', error);
                });
        }
    }, [user, token]);

    return (
        <div className={`card flex-fill d-flex flex-column p-30 mb-30 ${styles.contentCard}`}>
            <div className={styles.header}>
                <HeaderMyResources title="Mes ressources" />
            </div>
            <div className={styles.body}>
                {myResources.map((resource, index) => (
                    <MyResourcesCard key={index} ressource={resource} />
                ))}
            </div>
        </div>
    );
};

export default MyResources;