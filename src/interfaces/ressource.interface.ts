import { ObjectId, RessourceCategorie } from "../types";

export interface IRessource {
  id: ObjectId;
  title: string;
  image: string;
  categorie: Array<RessourceCategorie>;
  contenu_res: string;
}
