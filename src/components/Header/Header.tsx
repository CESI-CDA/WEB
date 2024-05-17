import { NavLink } from "react-router-dom";
import logoColor from "../../assets/images/logo-color.png";
import styles from "./Header.module.scss";
import { useContext, useState } from "react";
import HeaderMenu from "./components/HeaderMenu";
import { AuthContext } from "../../context";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  console.log(user);

  return (
    <header
      className={`${styles.header} d-flex flex-row align-items-center mb-20`}
    >
      <div className="flex-fill">
        <NavLink to="/">
          <img src={logoColor} alt="logo ressource relationnel" />
        </NavLink>
      </div>
      <ul className={`${styles.headerList} `}>
        {!user && (
          <>
            <NavLink to="/login">
              <button className="btn btn-primary mr-15">Connexion</button>
            </NavLink>
            <NavLink to="/register">
              <button className="btn btn-primary">Inscription</button>
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink to="favoris">
              <button className="btn btn-primary mr-15">Favoris</button>
            </NavLink>
            <NavLink to="profile">
              <button className="btn btn-primary mr-15">Profil</button>
            </NavLink>
            {user.role === 1 ? (
              <NavLink to="admin">
                <button className="btn btn-primary mr-15">
                  Administration
                </button>
              </NavLink>
            ) : null}

            <button onClick={logoutUser} className="btn btn-primary">
              Déconnexion
            </button>
          </>
        )}
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
