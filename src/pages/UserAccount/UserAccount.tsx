import React, { useState } from 'react';
import styles from "./UserAccount.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCameraRetro, faHeart, faBoxArchive, faPenClip } from "@fortawesome/free-solid-svg-icons";
import StatCard from './components/StatCard/StatCard';
import TextInputField from './components/TextInputField/TextInputField';
import backgroundHeader from "../../assets/images/background-header-user-account.jpg";


const UserAccount: React.FC = () => {
    // Déclarez des états pour les valeurs des champs de texte
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [pseudonyme, setPseudonyme] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className={`flex-fill container d-flex flex-column p-20`}>
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
                        <button className={styles.logoutButton} >
                            <FontAwesomeIcon icon={faSignOutAlt} className={styles.logoutIcon} />
                        </button>
                        <img
                            src="https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                            alt="User"
                            className={styles.circle}
                        />
                        <div className={styles.cameraIconContainer}>
                            <FontAwesomeIcon icon={faCameraRetro} className={styles.cameraIcon} />
                        </div>
                        <div className={styles.username}>Pseudo</div>
                    </div>
                    <div className={styles.cardStat}>
                        <button className={styles.button}>
                            <StatCard icon={faHeart} number={10} />
                        </button>
                        <button className={styles.button}>
                            <StatCard icon={faBoxArchive} number={5} />
                        </button>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.bodyheader}>
                            <div className={styles.bodytitle}>Mes infos</div>
                            <div className={styles.modifyprofile}>
                                <FontAwesomeIcon icon={faPenClip} />
                                <span className={styles.textmodifyprofile}>
                                    Modifier mes informations
                                </span>
                            </div>
                        </div>
                        <div className={styles.formfield}>
                            <TextInputField
                                label="Nom"
                                placeholder="Mon nom"
                                value={nom}
                                onChangeText={setNom}
                                editable={true}
                            />
                            <TextInputField
                                label="Prénom"
                                placeholder="Mon prénom"
                                value={prenom}
                                onChangeText={setPrenom}
                                editable={true}
                            />
                            <TextInputField
                                label="Pseudonyme"
                                placeholder="Mon pseudonyme"
                                value={pseudonyme}
                                onChangeText={setPseudonyme}
                                editable={true}
                            />
                            <TextInputField
                                label="Mail"
                                placeholder="Mon adresse mail"
                                value={email}
                                onChangeText={setEmail}
                                editable={false}
                            />
                            <div className={styles.positionButton}>
                                <button className={styles.deleteButton}>
                                Supprimer mon compte
                            </button></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
