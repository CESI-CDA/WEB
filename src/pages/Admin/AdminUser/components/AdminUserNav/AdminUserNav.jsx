import { NavLink } from "react-router-dom";
import styles from "./AdminUserNav.module.scss";
export function AdminUserNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="create"
      >
        Ajouter un utilisateur
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="manage"
      >
        Gérer les utilisateurs
      </NavLink>
    </ul>
  );
}

export default AdminUserNav;
