import { IRessource } from "interfaces";
import { RessourceCategorie, RessourceRelation } from "../types";

export function ressourceMapper(ressources: Array<any>): Array<IRessource> {
  const data = ressources.map((d) => {
    return {
      id: d.id ? d.id : "N/A",
      id_createur: d.id_createur ? d.id_createur : "N/A",
      title: d.titre_res ? d.titre_res : "N/A",
      image: d.url_res ? d.url_res : "N/A",
      contenu_res: d.contenu_res ? d.contenu_res : "N/A",
      visibilite: d.id_vis ? d.id_vis : "N/A",
      type_res: d.id_type_res ? d.id_type_res : "N/A",
      relation: d?.get_lien_ressource_relation
        ? d.get_lien_ressource_relation.map((c: any) => {
            return c.get_relation_ressource.intitule_rel;
          })
        : [RessourceRelation.INCONNUE],
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
