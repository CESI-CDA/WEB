import styles from "./AdminWaitingRessourcesList.module.scss";
import { useFetchRessources } from "../../../hooks";
import Loader from "../../../components/Loader/Loader";
import { RessourceCategorie } from "../../../types";
import { HTMLAttributes, MouseEventHandler, useEffect, useState } from "react";
import { IRessource } from "interfaces";
import { getWaitingRessources } from "../../../apis/ressource";

function AdminWaitingRessourcesList() {
  const [ressources, setRessources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        setRessources(await getWaitingRessources());
        setLoading(false);
      } catch (error) {
        console.error("Error fetch ressources", error);
      }
    };
    fetchRessources();
  }, []);

  const handleRessource = (name: string) => {
    setRessources((prevRessources) =>
      prevRessources.filter((r) => r.name !== name)
    );
  };
  return (
    <>
      {loading && <Loader />}

      <ul className={styles.list}>
        {ressources.length > 0
          ? ressources.map((r) => (
              <li key={r.name} className="d-flex align-items-center">
                <span className="flex-fill">{r.name}</span>
                <button
                  className="btn btn-primary mr-15"
                  onClick={() => handleRessource(r.name)}
                >
                  Accepter
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRessource(r.name)}
                >
                  Rejeter
                </button>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

export default AdminWaitingRessourcesList;
