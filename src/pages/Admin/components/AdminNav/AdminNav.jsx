import { NavLink } from "react-router-dom";
import styles from "./AdminNav.module.scss";
export function AdminNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="ressources"
      >
        Ressources en attentes de validation
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="comments"
      >
        commentaires en attentes de validation
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="users"
      >
        Gestion des utilisateurs
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="manageRessources"
      >
        Gestion des ressources
      </NavLink>
    </ul>
  );
}

export default AdminNav;
