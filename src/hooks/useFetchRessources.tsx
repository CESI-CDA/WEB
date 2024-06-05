import { useEffect, useState } from "react";
import { getRessources } from "../apis";
import { set } from "react-hook-form";

export function useFetchRessources(
  page?: number,
  etat?: 1 | 2 | 3
): [boolean, string, any[], any] {
  const [ressources, setRessources] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    async function fetchData() {
      try {
        setLoading(true);
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append("per_page", "18");
          queryParam.append("page", `${page}`);
        }
        if (etat) {
          queryParam.append("keywordIdEtat", etat.toString());
        }
        const fetchedRessources = await getRessources(queryParam);

        if (!cancel) {
          if (page && page !== 1) {
            setRessources((x) => [...x, ...fetchedRessources]);
          } else {
            setRessources(fetchedRessources);
          }
        }
      } catch (e) {
        setError("Erreur lors de la récupérations des ressources");
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      cancel = true;
    };
  }, [page, setRessources]);

  return [loading, error, ressources, setRessources];
}
