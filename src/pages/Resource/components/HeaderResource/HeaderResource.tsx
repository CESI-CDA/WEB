import React, { useContext, useEffect, useState } from 'react';
import styles from "./HeaderResource.module.scss";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../../context";
import { IContextAuth } from 'interfaces';
import { 
    addResourceToArchives, 
    addResourceToFavorites, 
    checkArchiveStatus, 
    checkFavoriteStatus, 
    removeResourceFromArchives, 
    removeResourceFromFavorites 
} from "../../../../apis/users";
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
    const userIdString = user.id.toString();

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                console.log('Fetching statuses for resourceId:', resourceId, 'userIdString:', userIdString);
                
                const [favoriteStatus, archiveStatus] = await Promise.all([
                    checkFavoriteStatus(resourceId, userIdString, token),
                    checkArchiveStatus(resourceId, userIdString, token)
                ]);

                console.log('Favorite status:', favoriteStatus);
                console.log('Archive status:', archiveStatus);
                
                setIsHeartFilled(favoriteStatus);
                setIsArchiveFilled(archiveStatus);
            } catch (error) {
                console.error('Erreur lors de la vérification des statuts:', error);
            }
        };

        fetchStatuses();
    }, [resourceId, userIdString, token]);

    const handleHeartClick = async () => {
        try {
            console.log('Toggling favorite status for resourceId:', resourceId, 'userIdString:', userIdString);
            
            if (isHeartFilled) {
                await removeResourceFromFavorites(userIdString, resourceId.toString(), token);
                console.log('Removed from favorites');
            } else {
                await addResourceToFavorites(userIdString, parseInt(resourceId), token);
                console.log('Added to favorites');
            }
            
            setIsHeartFilled(!isHeartFilled);
        } catch (error) {
            console.error(`Erreur lors de la gestion des favoris : ${error}`);
        }
    };

    const handleArchiveClick = async () => {
        try {
            console.log('Toggling archive status for resourceId:', resourceId, 'userIdString:', userIdString);
            
            if (isArchiveFilled) {
                await removeResourceFromArchives(userIdString, resourceId.toString(), token);
                console.log('Removed from archives');
            } else {
                await addResourceToArchives(userIdString, parseInt(resourceId), token);
                console.log('Added to archives');
            }
            
            setIsArchiveFilled(!isArchiveFilled);
        } catch (error) {
            console.error(`Erreur lors de la gestion des archives : ${error}`);
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
