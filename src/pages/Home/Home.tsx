import { useState } from "react";
import { useFetchRessources } from "../../hooks";
import styles from "./Home.module.scss";
import RessourceCard from "./components/RessourceCard/RessourceCard";
import Search from "./components/Search/Search";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loadind, error, ressources] = useFetchRessources(page);
  console.log(ressources);

  function handleClickMoreRessources() {
    setPage((current) => current + 1);
  }

  return (
    <>
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className={`my-30 `}>Découvrez les nouvelles ressources</h1>
        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
        >
          <Search setFilter={setFilter} />
          {loadind && !ressources.length ? (
            <Loader />
          ) : (
            <div className={styles.grid}>
              {ressources
                .filter((r) => r.title.toLowerCase().startsWith(filter))
                .map((ressource) => (
                  <RessourceCard key={ressource.id} ressource={ressource} />
                ))}
            </div>
          )}
          <div className="d-flex flex-row justify-content-center align-items-center p-20">
            <div className="d-flex flex-row justify-content-center align-items-center p-20">
              <button
                onClick={handleClickMoreRessources}
                className="btn btn-primary"
              >
                Charger plus de ressources
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
