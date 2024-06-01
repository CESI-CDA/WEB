import React, { useContext, useEffect, useState } from 'react';
import styles from "./HeaderResource.module.scss";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../../context";
import { IContextAuth } from 'interfaces';
import { addResourceToArchives, addResourceToFavorites, checkArchiveStatus, checkFavoriteStatus, removeResourceFromArchives, removeResourceFromFavorites }from "../../../../apis/users";
import { IRessource } from 'interfaces';


const HeaderResource: React.FC<{ resourceId: IRessource['id'] }> = ({ resourceId }) => {
    const authContext = useContext<IContextAuth | null>(AuthContext);

    if (!authContext || !authContext.user || authContext.token === null) {
        return null;
    }

    const { token, user } = authContext;

    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isArchiveFilled, setIsArchiveFilled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const userIdString = user.id.toString();
                const favoriteStatus = await checkFavoriteStatus(resourceId, userIdString, token);
                setIsHeartFilled(favoriteStatus);
            } catch (error) {
                console.error('Erreur lors de la vérification du statut du favori de la ressource:', error);
            }
        };

        fetchFavoriteStatus();
    }, []); 

    useEffect(() => {
        const fetchArchiveStatus = async () => {
            try {
                const userIdString = user.id.toString();
                const archiveStatus = await checkArchiveStatus(resourceId, userIdString, token);
                setIsArchiveFilled(archiveStatus);
            } catch (error) {
                console.error('Erreur lors de la vérification du statut d\'archive de la ressource:', error);
            }
        };

        fetchArchiveStatus();
    }, []); 

    const handleHeartClick = async () => {
        if (!isHeartFilled) {
            const userIdString = user.id.toString();
            try {
                const resourceIdNumber = parseInt(resourceId)
                await addResourceToFavorites(userIdString, resourceIdNumber, token);
                setIsHeartFilled(true);
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la ressource aux favoris :', error);
            }
        } else {
            const userIdString = user.id.toString();
            try {
                const resourceIdNumber = parseInt(resourceId);
                const resourceIdString = resourceIdNumber.toString();
                await removeResourceFromFavorites(userIdString, resourceIdString, token);
                setIsHeartFilled(false);
            } catch (error) {
                console.error('Erreur lors de la suppression de la ressource des favoris :', error);
            }
        }
    };

    const handleArchiveClick = async  () => {
        if (!isArchiveFilled) {
            const userIdString = user.id.toString();
            try {
                const resourceIdNumber = parseInt(resourceId)
                await addResourceToArchives(userIdString, resourceIdNumber, token);
                setIsArchiveFilled(true);
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la ressource aux archives :', error);
            }
        } else {
            const userIdString = user.id.toString();
            try {
                const resourceIdNumber = parseInt(resourceId);
                const resourceIdString = resourceIdNumber.toString();
                await removeResourceFromArchives(userIdString, resourceIdString, token);
                setIsArchiveFilled(false);
            } catch (error) {
                console.error('Erreur lors de la suppression de la ressource des archives :', error);
            }
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <i className={`fa-solid fa-chevron-left ${styles.icon}`} style={{ color: "white" }} onClick={handleBackClick}></i>
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
