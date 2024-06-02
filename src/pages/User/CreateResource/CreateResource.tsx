import React from 'react';
import styles from './CreateResource.module.scss';
import HeaderCreateResource from './components/HeaderCreateResource/HeaderCreateResource';


const CreateResource: React.FC = () => {
    return (
        <div className={`card flex-fill d-flex flex-column p-30 mb-30 ${styles.contentCard}`}>
            <div className={styles.header}>
                <HeaderCreateResource title="Créer une nouvelle ressource" />
            </div>
            <div className={styles.formContainer}>
                <input type="file" accept="image/*" className={styles.input} />

                <input
                    type="text"
                    placeholder="Title"
                    className={styles.input}
                />

                <textarea
                    placeholder="Content"
                    className={styles.input}
                />

                <select className={styles.input}>
                    <option value="">Type de ressource</option>
                    {/* Remplacer les options suivantes par des données dynamiques */}
                    <option value="1">Type 1</option>
                    <option value="2">Type 2</option>
                </select>



                <select className={styles.input}>
                    <option value="">Visibilité</option>
                    {/* Remplacer les options suivantes par des données dynamiques */}
                    <option value="1">Visibilité 1</option>
                    <option value="2">Visibilité 2</option>
                </select>

                <select className={styles.input}>
                    <option value="">Pour qui ?</option>
                    {/* Remplacer les options suivantes par des données dynamiques */}
                    <option value="1">Relation 1</option>
                    <option value="2">Relation 2</option>
                </select>

                <button className={styles.button}>Publier</button>
            </div>
        </div>

    );
};

export default CreateResource;
