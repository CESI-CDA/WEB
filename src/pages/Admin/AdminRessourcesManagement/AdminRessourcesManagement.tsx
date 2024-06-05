import styles from "./AdminRessourcesManagement.module.scss";
import { useFetchRessources } from "../../../hooks";
import Loader from "../../../components/Loader/Loader";
import { ObjectId, RessourceCategorie } from "../../../types";
import { useContext, useState } from "react";
import { IRessource } from "interfaces";
import { deleteRessource } from "../../../apis";
import { AuthContext } from "../../../context";
import { set } from "react-hook-form";

export function AdminRessourcesManagement() {
  const [page, setPage] = useState(1);
  const [loading, error, ressources, setRessources] = useFetchRessources(page);
  const [ressourcesCategorie, setRessourcesCategorie] = useState("");
  const { token } = useContext(AuthContext);

  function handleClickMoreRessources() {
    setPage((current) => current + 1);
  }
  const handleRessourcesTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRessourcesCategorie((prevValue) => (prevValue === value ? "" : value));
  };

  const filteredRessources = ressourcesCategorie
    ? ressources.filter((r: IRessource) =>
        r.categorie.includes(ressourcesCategorie as RessourceCategorie)
      )
    : ressources;

  function handleDeleteRessource(id: ObjectId) {
    deleteRessource(id, token);
    setRessources(ressources.filter((r) => r.id !== id));
  }
  return (
    <div className="d-flex flex-column align-items-center flex-fill justify-content-center">
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
              value={RessourceCategorie.TECHNOLOGIE}
              checked={ressourcesCategorie === RessourceCategorie.TECHNOLOGIE}
              onChange={handleRessourcesTypeChange}
            />
            <span>{RessourceCategorie.TECHNOLOGIE}</span>
          </label>
        </div>
        {loading && <Loader />}
        {filteredRessources.length > 0
          ? filteredRessources.map((r) => (
              <li key={r.id} className="d-flex align-items-center">
                <span className="flex-fill">{r.title}</span>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteRessource(r.id)}
                >
                  Supprimer
                </button>
              </li>
            ))
          : null}
      </ul>
      <button
        onClick={handleClickMoreRessources}
        className="btn btn-primary m-10"
      >
        Charger plus de ressources
      </button>{" "}
    </div>
  );
}

export default AdminRessourcesManagement;
