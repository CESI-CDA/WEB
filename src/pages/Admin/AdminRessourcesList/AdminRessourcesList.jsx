import styles from "./AdminRessourcesList.module.scss";
import { useFetchRessources } from "../../../hooks";
import Loader from "../../../components/Loader/Loader";

function AdminRecipesList() {
  const [loading, error, ressources] = useFetchRessources(1);

  return (
    <>
      {loading && <Loader />}
      <ul className={styles.list}>
        {ressources.length > 0
          ? ressources.map((r) => (
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
