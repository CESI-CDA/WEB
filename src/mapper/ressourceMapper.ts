import { IRessource } from "interfaces";

export function ressourceMapper(ressources: Array<any>): Array<IRessource> {
  const data = ressources.map((d) => {
    return {
      id: d.id ? d.id : "N/A",
      title: d.titre_res ? d.titre_res : "N/A",
      image: d.url_res ? d.url_res : "N/A",
    };
  });
  return data;
}

export default ressourceMapper;
