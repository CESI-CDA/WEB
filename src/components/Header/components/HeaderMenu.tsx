import { NavLink } from "react-router-dom";
import style from "./HeaderMenu.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../../context";

function HeaderMenu() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <ul className={`${style.menuContainer} card p-20`}>
      {user && (
        <>
          <NavLink to="/login">
            <li>Connexion</li>
          </NavLink>
          <NavLink to="/register">
            <li>Inscription</li>
          </NavLink>
        </>
      )}
      {!user && (
        <>
          <NavLink to="favoris">
            <li>Favoris</li>
          </NavLink>
          <NavLink to="profile">
            <li>Profil</li>
          </NavLink>
          <li onClick={logoutUser}>Déconnexion</li>
        </>
      )}
    </ul>
  );
}

export default HeaderMenu;
