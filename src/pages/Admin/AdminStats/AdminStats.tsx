import { set } from "react-hook-form";
import { getStats } from "../../../apis/stats";
import { AuthContext } from "../../../context";
import { useContext, useEffect, useState } from "react";
import { IStats } from "../../../interfaces/stats.interface";
import Loader from "../../../components/Loader/Loader";

export function AdminStats() {
  const [stats, setStats] = useState<IStats>(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getStats(token);
        setStats(stats);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <div>
      {loading && <Loader />}
      {stats && (
        <div>
          <div>Nombre de ressources: {stats.cree}</div>
          <div>Nombre de ressources archivées: {stats.archive}</div>
          <div>Nombre de ressources en favoris: {stats.favoris}</div>
          <div>Nombre de ressources en attente: {stats.waitingRessource}</div>
        </div>
      )}
    </div>
  );
}
