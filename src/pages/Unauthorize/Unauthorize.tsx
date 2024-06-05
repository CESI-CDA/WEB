import { NavLink } from "react-router-dom";

export const Unauthorize = () => {
  return (
    <div className="d-flex flex-column justify-content-center flex-fill align-items-center">
      <h1 className="mb-20">
        Vous n'étes pas autoriser a acceder a cette page
      </h1>
      <button className="btn btn-primary">
        <NavLink to="/" style={{ color: "white" }}>
          Retour a l'accueil
        </NavLink>
      </button>
    </div>
  );
};
