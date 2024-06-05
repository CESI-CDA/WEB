import styles from "./AdminWaitingRessourcesList.module.scss";
import { useFetchRessources } from "../../../hooks";
import Loader from "../../../components/Loader/Loader";
import { ObjectId, RessourceCategorie } from "../../../types";
import {
  HTMLAttributes,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRessource } from "interfaces";
import { acceptRessource, getWaitingRessources } from "../../../apis/ressource";
import { AuthContext } from "../../../context";

function AdminWaitingRessourcesList() {
  const { token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [loading, error, ressources, setRessources] = useFetchRessources(
    page,
    1
  );

<<<<<<< HEAD
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
=======
  async function handleRessource(id: ObjectId, token: string, etat: 2 | 3) {
    try {
      acceptRessource(id, token, etat);
      setRessources(ressources.filter((r) => r.id !== id));
    } catch (e) {
      console.error("Error accepting ressource:", e);
    }
  }
>>>>>>> develop
  return (
    <>
      {loading && <Loader />}

      <ul className={styles.list}>
        {ressources.length > 0 ? (
          ressources.map((r) => (
            <li key={r.name} className="d-flex align-items-center">
              <span className="flex-fill">{r.title}</span>
              <button
                className="btn btn-primary mr-15"
                onClick={() => handleRessource(r.id, token, 2)}
              >
                Accepter
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleRessource(r.id, token, 3)}
              >
                Rejeter
              </button>
            </li>
          ))
        ) : (
          <p>Aucune ressource en attentes de validation</p>
        )}
      </ul>
    </>
  );
}

export default AdminWaitingRessourcesList;
