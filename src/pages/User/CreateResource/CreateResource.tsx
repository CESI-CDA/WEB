import React, { useState } from 'react';
import styles from './CreateResource.module.scss';
import HeaderCreateResource from './components/HeaderCreateResource/HeaderCreateResource';

const CreateResource: React.FC = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`card flex-fill d-flex flex-column p-30 mb-30 ${styles.contentCard}`}>
            <div className={styles.header}>
                <HeaderCreateResource title="Créer une nouvelle ressource" />
            </div>
            <div className={styles.formContainer}>
                <input type="file" accept="image/*" className={styles.input} onChange={handleImageChange} />

                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className={styles.imagePreview} />}

                <input type="text" placeholder="Title" className={styles.input} />

                <textarea placeholder="Content" className={styles.input} />

                <select className={styles.input}>
                    <option value="">Type de ressource</option>
                    <option value="2">News</option>
                    <option value="3">Exercice / Atelier</option>
                    <option value="3">Documentaire</option>
                </select>

                <select className={styles.input}>
                    <option value="">Catégorie</option>
                    <option value="1">Communication</option>
                    <option value="2">Culture</option>
                    <option value="3">Sport</option>
                    <option value="4">Technologie</option>
                    <option value="5">Finance</option>
                    <option value="6">Education</option>
                    <option value="7">Santé</option>
                </select>
                <select className={styles.input}>
                    <option value="">Visibilité</option>
                    <option value="1">Public</option>
                    <option value="2">Privée</option>
                </select>

                <select className={styles.input}>
                    <option value="">Relation</option>
                    <option value="1">Famille</option>
                    <option value="2">Ami</option>
                </select>

                <div className="buttonContainer">
                    <button className={styles.button}>Publier</button>
                </div>
            </div>
        </div>
    );
};

export default CreateResource;
