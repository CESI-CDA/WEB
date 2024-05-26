import { NavLink } from "react-router-dom";
import styles from "./UserNav.module.scss";
export function UserNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="account"
      >
        Mon compte
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="myresources"
      >
        Ma liste de ressources
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="favorite"
      >
        Mes ressources favorites
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="archive"
      >
        Mes ressources en attente de lecture
      </NavLink>
    </ul>
  );
}

export default UserNav;
