import { IRessource } from "../../../../interfaces";
import styles from "./RessourceCard.module.scss";

function RessourceCard({ ressource }: { ressource: IRessource }) {
  return (
    <div className={styles.ressource}>
      <div className={styles.imageContainer}>
        <img
          src={ressource.image}
          alt="recipe"
          loading="lazy"
          width="300"
          height="300"
        />
      </div>
      <div
        className={`${styles.ressourceTitle} d-flex flex-column justify-content-center align-items-center p-10`}
      >
        <h3>{ressource.title}</h3>
      </div>
    </div>
  );
}

export default RessourceCard;
