import { statsMapper } from "../mapper/statsMapper";
import { API_DEV } from "./auth";

export async function getStats(token: string, param?: string) {
  const querryParam = new URLSearchParams();
  param && querryParam.append("date", param);
  const response = await fetch(`${API_DEV}/statistiques${querryParam}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    const statsMapped = statsMapper(data.items[0]);
    return statsMapped;
  } else {
    throw new Error("erreur lors de la récupération des statistiques");
  }
}
