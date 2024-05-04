import { NavLink } from "react-router-dom";
import logoColor from "../../assets/images/logo-color.png";
import styles from "./Header.module.scss";
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src={logoColor} alt="logo ressource relationnel" />
        </NavLink>
      </div>
      <ul className={`${styles.headerList} `}>
        <NavLink to="/login">
          <button className="btn btn-primary mr-15">Connexion</button>
        </NavLink>
        <NavLink to="/register">
          <button className="btn btn-primary">Inscription</button>
        </NavLink>
      </ul>
      <i
        onClick={() => setShowMenu(!showMenu)}
        className={`fa-solid fa-bars  ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div className="calc" onClick={() => setShowMenu(false)}></div>
          <HeaderMenu />
        </>
      )}
    </header>
  );
}
export default Header;
