import { NavLink } from "react-router-dom";
import styles from "./AdminNav.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../../../context";
export function AdminNav() {
  const { user } = useContext(AuthContext);
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="ressources"
      >
        Ressources en attente de validation
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="comments"
      >
        Commentaires en attente de validation
      </NavLink>
      {user?.role === 1 && (
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="users"
        >
          Gestion des utilisateurs
        </NavLink>
      )}
      {user?.role <= 2 && (
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="manageRessources"
        >
          Gestion des ressources
        </NavLink>
      )}
    </ul>
  );
}

export default AdminNav;
