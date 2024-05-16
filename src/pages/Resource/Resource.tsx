import React, { useState, useEffect } from 'react';
import styles from "./Resource.module.scss";
import HeaderResource from './components/HeaderResource/HeaderResource';
import { getRessource } from '../../apis/ressource'; 
import { useParams } from 'react-router-dom';

const Resource: React.FC = () => {
    const [resourceData, setResourceData] = useState<any>(null);
    const { id = "" } = useParams<{ id?: string }>();

    useEffect(() => {
        const fetchResourceData = async () => {
            try {
                const data = await getRessource(id);
                setResourceData(data);
            } catch (error) {
                console.error('Error fetching resource data:', error);
            }
        };
        fetchResourceData();
    }, [id]);

    return (
        <div className={`flex-fill container d-flex flex-column p-20`}>
            <div className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}>
                <div className={styles.header}>
                    <HeaderResource />
                </div>
                {resourceData && (
                    <>
                        <img src={resourceData.item.url_res} alt="Resource" className={styles.imageContainer} />
                        <div className={styles.characteristicProp}>
                            <p className={styles.category}>
                                Catégorie : {resourceData.item.get_lien_ressource_categorie.map((lien: { get_categorie: { intitule_cat: string } }) => lien.get_categorie.intitule_cat).join(" / ")}
                            </p>
                            <p className={styles.typeOfRelation}>Types de relations : {resourceData?.item.get_lien_ressource_relation.map((lien: { get_relation_ressource: { intitule_rel: string } }) => lien.get_relation_ressource.intitule_rel)}</p>
                            <p className={styles.typeOfResource}>Type de ressource : {resourceData.item.get_type_ressource.intitule_type_res}</p>
                        </div>
                        <div className={styles.content}>
                            <h1 className={styles.title}>{resourceData.item.titre_res}</h1>
                            <p className={styles.resourceContent}>{resourceData.item.contenu_res}</p>
                        </div>
                    </>
                )}
                <div className={styles.headerComment}>
                    <h1 className={styles.comment}>Commentaires</h1>
                    <button className={styles.icon}>+</button>
                </div>
            </div>
        </div>
    );
};

export default Resource;
