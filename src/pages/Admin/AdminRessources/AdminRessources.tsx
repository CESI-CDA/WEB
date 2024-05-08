import styles from "./AdminRessources.module.scss";
import { useFetchRessources } from "../../../hooks";
import Loader from "../../../components/Loader/Loader";
import { RessourceCategorie } from "../../../types";
import { useState } from "react";
import { IRessource } from "interfaces";

export function AdminRessources() {
  const [page, setPage] = useState(1);
  const [loading, error, ressources] = useFetchRessources(page);
  const [ressourcesCategorie, setRessourcesCategorie] = useState("");

  function handleClickMoreRessources() {
    setPage((current) => current + 1);
  }
  const handleRessourcesTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRessourcesCategorie((prevValue) => (prevValue === value ? "" : value));
    console.log(ressources);
  };

  const filteredRessources = ressourcesCategorie
    ? ressources.filter((r: IRessource) =>
        r.categorie.includes(ressourcesCategorie as RessourceCategorie)
      )
    : ressources;
  return (
    <div className="d-flex flex-column align-items-center flex-fill justify-content-center">
      {loading && <Loader />}
      <ul className={styles.list}>
        <div className="mb-20">
          <label className={`${styles.tag} mr-5`}>
            <input
              type="checkbox"
              value={RessourceCategorie.COMMUNICATION}
              checked={ressourcesCategorie === RessourceCategorie.COMMUNICATION}
              onChange={handleRessourcesTypeChange}
            />
            <span> {RessourceCategorie.COMMUNICATION}</span>
          </label>
          <label className={`${styles.tag} mr-5`}>
            <input
              type="checkbox"
              value={RessourceCategorie.CULTURE}
              checked={ressourcesCategorie === RessourceCategorie.CULTURE}
              onChange={handleRessourcesTypeChange}
            />
            <span>{RessourceCategorie.CULTURE}</span>
          </label>
          <label className={`${styles.tag} mr-5`}>
            <input
              type="checkbox"
              value={RessourceCategorie.EDUCATION}
              checked={ressourcesCategorie === RessourceCategorie.EDUCATION}
              onChange={handleRessourcesTypeChange}
            />
            <span>{RessourceCategorie.EDUCATION}</span>
          </label>
          <label className={`${styles.tag} mr-5`}>
            <input
              type="checkbox"
              value={RessourceCategorie.FINANCE}
              checked={ressourcesCategorie === RessourceCategorie.FINANCE}
              onChange={handleRessourcesTypeChange}
            />
            <span> {RessourceCategorie.FINANCE}</span>
          </label>
          <label className={`${styles.tag} mr-5`}>
            <input
              type="checkbox"
              value={RessourceCategorie.SPORT}
              checked={ressourcesCategorie === RessourceCategorie.SPORT}
              onChange={handleRessourcesTypeChange}
            />
            <span>{RessourceCategorie.SPORT}</span>
          </label>
          <label className={`${styles.tag} mr-5`}>
            <input
              type="checkbox"
              value={RessourceCategorie.TECHNOLOGiE}
              checked={ressourcesCategorie === RessourceCategorie.TECHNOLOGiE}
              onChange={handleRessourcesTypeChange}
            />
            <span>{RessourceCategorie.TECHNOLOGiE}</span>
          </label>
        </div>
        {filteredRessources.length > 0
          ? filteredRessources.map((r) => (
              <li key={r.title} className="d-flex align-items-center">
                <span className="flex-fill">{r.title}</span>
                <button className="btn btn-primary mr-15 ml-10">
                  Suspendre
                </button>
                <button className="btn btn-danger">Suprimer</button>
              </li>
            ))
          : null}
      </ul>
      <button
        onClick={handleClickMoreRessources}
        className="btn btn-primary m-10"
      >
        Charger plus de ressources
      </button>
    </div>
  );
}

export default AdminRessources;
