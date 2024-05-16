import { NavLink } from "react-router-dom";
import { IRessource } from "../../../../interfaces";
import styles from "./RessourceCard.module.scss";

function RessourceCard({ ressource }: { ressource: IRessource }) {
  return (
    <NavLink to={`/resource/${ressource.id}`}>
      <div className={styles.imageContainer}>
        <img
          src={ressource.image}
          alt="recipe"
          loading="lazy"
          width="300"
          height="300"
        />
      </div>
      <div className={`${styles.resourceTitle} d-flex flex-column justify-content-center align-items-center p-10`}>
        <h3>{ressource.title}</h3>
      </div>
    </NavLink>
  );
}

export default RessourceCard;
