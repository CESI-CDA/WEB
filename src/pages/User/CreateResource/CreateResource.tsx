
import React, { useState, useContext, useEffect } from 'react';
import styles from './CreateResource.module.scss';
import HeaderCreateResource from './components/HeaderCreateResource/HeaderCreateResource';
import { IContextAuth } from 'interfaces';
import { createRessource, getCategories, getRelations, getResourcesTypes, getVisibilities } from '../../../apis'; // Assurez-vous que vous avez une fonction getRelations dans votre API
import { AuthContext } from "../../../context";

const CreateResource: React.FC = () => {
    const authContext = useContext<IContextAuth | null>(AuthContext);

    if (!authContext || !authContext.token) {
        throw new Error('Authentication token is missing.');
    }

    const { token, user } = authContext;
    const userId = user ? user.id : "N/A";
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [categories, setCategories] = useState<Array<{ id: number; intitule_cat: string }>>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [relations, setRelations] = useState<Array<{ id: number; intitule_rel: string }>>([]);
    const [selectedRelation, setSelectedRelation] = useState<string>('');
    const [visibilities, setVisibilities] = useState<Array<{ id: number; intitule_vis: string }>>([]);
    const [selectedVisibility, setSelectedVisibility] = useState<string>('');
    const [typesOfResource, setTypesOfResource] = useState<Array<{ id: number; intitule_type_res: string }>>([]);
    const [selectedTypeOfResource, setSelectedTypeOfresource] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCategories(token).then((data) => {
            setCategories(data);
        }).catch((error) => {
            console.error('Error fetching categories:', error);
        });

        getRelations(token).then((data) => {
            setRelations(data);
        }).catch((error) => {
            console.error('Error fetching relations:', error);
        });

        getVisibilities(token).then((data) => {
            setVisibilities(data);
        }).catch((error) => {
            console.error('Error fetching visibilities:', error);
        });

        getResourcesTypes(token).then((data) => {
            setTypesOfResource(data);
        }).catch((error) => {
            console.error('Error fetching types of resources:', error);
        });
    }, []);

    const handleCreateResource = async () => {
        try {
            const newResource: ICreateRessource = {
                titre_res: title,
                contenu_res: content,
                url_res: imagePreviewUrl ?? '',
                id_type_res: parseInt(selectedTypeOfResource),
                id_vis: parseInt(selectedVisibility),
                id_createur: parseInt(userId.toString()),  // Convertir en nombre
                arrayIdRel: [parseInt(selectedRelation)],
                arrayIdCat: [parseInt(selectedCategory)],
            };

            const message = await createRessource(newResource, token);
            alert(message);
            
            setTitle('');
            setImagePreviewUrl(null);
            setContent('');
            setSelectedTypeOfresource('');
            setSelectedCategory('');
            setSelectedVisibility('');
            setSelectedRelation('');
        } catch (error) {
            console.error('Error creating resource:', error);
            setError('Erreur lors de la création de la ressource');
        }
    };

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
                <input type="text" placeholder="Title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" className={styles.input} value={content} onChange={(e) => setContent(e.target.value)} />
                <select className={styles.input} value={selectedTypeOfResource} onChange={(e) => setSelectedTypeOfresource(e.target.value)}>
                    <option value="">Type de ressource</option>
                    {typesOfResource.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.intitule_type_res}
                        </option>
                    ))}
                </select>
                <select className={styles.input} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Catégorie</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.intitule_cat}
                        </option>
                    ))}
                </select>
                <select className={styles.input} value={selectedVisibility} onChange={(e) => setSelectedVisibility(e.target.value)}>
                    <option value="">Visibilité</option>
                    {visibilities.map(visibility => (
                        <option key={visibility.id} value={visibility.id}>
                            {visibility.intitule_vis}
                        </option>
                    ))}
                </select>
                <select className={styles.input} value={selectedRelation} onChange={(e) => setSelectedRelation(e.target.value)}>
                    <option value="">Relation</option>
                    {relations.map(relation => (
                        <option key={relation.id} value={relation.id}>
                            {relation.intitule_rel}
                        </option>
                    ))}
                </select>
                <div className="buttonContainer">
                    <button className={styles.button} onClick={handleCreateResource}>
                        Publier
                    </button>
                </div>
                {error && <p className="form-error">{error}</p>}
            </div>
        </div>

    );
};

export default CreateResource;
