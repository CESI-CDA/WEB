import React from 'react';
import styles from "./Resource.module.scss";
import HeaderResource from './components/HeaderResource/HeaderResource';

const Resource: React.FC = () => {
    return (
        <div className={`flex-fill container d-flex flex-column p-20`}>
            <div className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}>
                <div className={styles.header}>
                    <HeaderResource />
                </div>
                <img src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg" alt="Resource" className={styles.imageContainer} />
                <div className={styles.characteristicProp}>
                    <p className={styles.category}>Catégorie : Animalier</p>
                    <p className={styles.typeOfRelation}>Types de relations : public</p>
                    <p className={styles.typeOfResource}>Type de ressource : Culture</p>
                </div>
                <div className={styles.content}>
                    <h1 className={styles.title}>Le carlin</h1>
                    <p className={styles.resourceContent}>
                        Le carlin, également connu sous le nom de bouledogue français, est une race de chien de petite taille au tempérament joyeux et affectueux. Originaire de Chine, le carlin est célèbre pour son museau plat, ses grands yeux expressifs et sa queue enroulée. Ces chiens sont très sociables et s'entendent généralement bien avec les enfants et les autres animaux de compagnie. Ils sont également connus pour leur nature espiègle et leur amour pour les câlins et l'attention de leurs propriétaires. Les carlins sont des compagnons de vie merveilleux pour ceux qui cherchent un ami fidèle et plein de vie.<br /><br />
                        Les carlins sont également réputés pour leur personnalité enjouée et leur nature comique. Leurs expressions faciales souvent hilarantes et leur comportement ludique font d'eux des compagnons de jeu divertissants. Bien qu'ils puissent parfois être têtus, leur intelligence et leur désir de plaire à leurs propriétaires les rendent relativement faciles à entraîner. En raison de leur petite taille et de leur faible besoin d'exercice, les carlins s'adaptent bien à la vie en appartement ou en maison avec un petit jardin. Cependant, il est important de surveiller leur poids, car ils ont tendance à prendre du poids facilement. En résumé, le carlin est une race de chien charmante et attachante qui apporte de la joie et du bonheur à tous ceux qui ont la chance de les avoir comme compagnons.<br /><br />
                        Les carlins, également connus sous le nom de "Pugs" en anglais, sont une race de chien de petite taille originaire de Chine. Ils sont reconnaissables à leurs grands yeux expressifs, leurs rides profondes sur le visage et leur queue enroulée. Les carlins sont des compagnons aimables et affectueux, qui adorent passer du temps avec leur famille humaine. Ils sont également connus pour leur nature sociable et leur capacité à s'entendre avec d'autres animaux de compagnie.<br /><br />

                        Sur le plan de la santé, les carlins peuvent être sujets à certains problèmes respiratoires en raison de leur museau court, ce qui les rend sensibles à la chaleur et à l'effort physique intense. Ils peuvent également être prédisposés à l'embonpoint, il est donc important de surveiller leur alimentation et de leur fournir suffisamment d'exercice pour maintenir un poids santé.<br /><br />

                        Malgré ces préoccupations de santé, les carlins sont des compagnons merveilleux pour les familles de tous types. Leur personnalité enjouée et leur capacité à apporter de la joie à leur entourage en font des animaux de compagnie très appréciés dans le monde entier. Que ce soit pour une séance de câlins sur le canapé ou une balade dans le parc, les carlins sont toujours prêts à faire plaisir à ceux qu'ils aiment.
                    </p>
                </div>
                <div className={styles.headerComment}>
                    <h1 className={styles.comment}>Commentaires</h1>
                    <button className={styles.icon}>+</button>
                </div>
            </div>
        </div>
    );
};

export default Resource;
