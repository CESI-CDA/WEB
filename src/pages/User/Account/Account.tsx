import React, { useState, useEffect, useContext } from "react";
import styles from "./Account.module.scss";
import StatCard from "./components/StatCard/StatCard";
import TextInputField from "./components/TextInputField/TextInputField";
import backgroundHeader from '../../../assets/images/background-header-user-account.jpg';
import { IContextAuth, IUser, UserData } from "interfaces";
import { AuthContext } from "../../../context";
import { getUserById } from "../../../apis/users";


const Account: React.FC = () => {
    const authContext = useContext<IContextAuth | null>(AuthContext);
    if (!authContext) {
        return <div>Authentification non disponible</div>;
    }
    const { token, user } = authContext;
    const [userData, setUserData] = useState<UserData | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user && token) {
                    const fetchedUserData = await getUserById(user.id, token);
                    console.log("Données utilisateur récupérées:", fetchedUserData);
                    setUserData(fetchedUserData);
                    console.log("Données utilisateur mises à jour:", fetchedUserData);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur:", error);
            }
        };

        fetchUser();
    }, [user, token]);


    return (
        <div className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.topheader}>
                        <img
                            src={backgroundHeader}
                            alt="Header"
                            className={styles.headerImage}
                        />
                    </div>
                    <button className={styles.logoutButton}>
                        <i className={`fa-solid fa-right-from-bracket ${styles.logoutIcon}`}></i>
                    </button>
                    <img
                        src="https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                        alt="User"
                        className={styles.circle}
                    />
                    <div className={styles.cameraIconContainer}>
                        <i className={`fa-solid fa-camera-retro ${styles.cameraIcon}`}></i>
                    </div>
                    <div className={styles.username}>{userData?.item?.user?.pseudonyme || "Pseudo"}</div>

                </div>
                <div className={styles.cardStat}>
                    <button className={styles.button}>
                        <StatCard number={userData?.item.getNombreFavoris ?? 0} icon="fa-solid fa-heart" />
                    </button>
                    <button className={styles.button}>
                        <StatCard number={userData?.item.getNombreArchive ?? 0} icon="fa-solid fa-box-archive" />
                    </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.bodyheader}>
                        <div className={styles.bodytitle}>Mes infos</div>
                        <div className={styles.modifyprofile}>
                            <i className="fa-solid fa-pen-clip"></i>
                            <span className={styles.textmodifyprofile}>
                                Modifier mes informations
                            </span>
                        </div>
                    </div>
                    <div className={styles.formfield}>
                        <TextInputField
                            label="Nom"
                            placeholder="Mon nom"
                            value={userData?.item?.user?.nom || ''}
                            editable={true}
                        />
                        <TextInputField
                            label="Prénom"
                            placeholder="Mon prénom"
                            value={userData?.item?.user?.prenom || ''}
                            editable={true}
                        />
                        <TextInputField
                            label="Pseudonyme"
                            placeholder="Mon pseudonyme"
                            value={userData?.item?.user?.pseudonyme || ''}

                            editable={true}
                        />
                        <TextInputField
                            label="Mail"
                            placeholder="Mon adresse mail"
                            value={userData?.item?.user?.email || ''}
                            editable={false}
                        />
                        <div className={styles.positionButton}>
                            <button className={styles.deleteButton}>
                                Supprimer mon compte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
