import { IRessource } from "interfaces";
import { RessourceCategorie } from "../types";

export function ressourceMapper(ressources: Array<any>): Array<IRessource> {
  const data = ressources.map((d) => {
    return {
      id: d.id ? d.id : "N/A",
      title: d.titre_res ? d.titre_res : "N/A",
      image: d.url_res ? d.url_res : "N/A",
      categorie: d?.get_lien_ressource_categorie
        ? d.get_lien_ressource_categorie.map((c: any) => {
            return c.get_categorie.intitule_cat;
          })
        : [RessourceCategorie.INCONNUE],
    };
  });
  return data;
}

export default ressourceMapper;
