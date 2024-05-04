import { NavLink } from "react-router-dom";
import style from "./HeaderMenu.module.scss";

function HeaderMenu() {
  return (
    <ul className={`${style.menuContainer} card p-20`}>
      <li>Inscription</li>
      <li>Connexion</li>
    </ul>
  );
}

export default HeaderMenu;
