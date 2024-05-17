import styles from "./AdminRessourcesList.module.scss";
import { useFetchRessources } from "../../../hooks";
import Loader from "../../../components/Loader/Loader";
import { RessourceCategorie } from "../../../types";
import { useState } from "react";
import { IRessource } from "interfaces";

function AdminRecipesList() {
  const [loading, error, ressources] = useFetchRessources(1);
  const [ressourcesCategorie, setRessourcesCategorie] = useState("");

  const handleRessourcesTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRessourcesCategorie(e.target.value);
    console.log(ressources);
  };

  const filteredRessources = ressourcesCategorie
    ? ressources.filter((r: IRessource) =>
        r.categorie.includes(ressourcesCategorie as RessourceCategorie)
      )
    : ressources;
  return (
    <>
      {loading && <Loader />}

      <ul className={styles.list}>
        {filteredRessources.length > 0
          ? filteredRessources.map((r) => (
              <li key={r.title} className="d-flex align-items-center">
                <span className="flex-fill">{r.title}</span>
                <button className="btn btn-primary mr-15">Accepter</button>
                <button className="btn btn-danger">rejeter</button>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

export default AdminRecipesList;
