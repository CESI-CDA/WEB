import { IStats } from "../interfaces/stats.interface";

export function statsMapper(data: any): IStats {
  return {
    archive: data.nombre_ressources_archive
      ? data.nombre_ressources_archive
      : 0,
    favoris: data.nombres_favoris ? data.nombres_favoris : 0,
    cree: data.nombre_ressources_crees ? data.nombre_ressources_crees : 0,
    waitingRessource: data.nombre_ressources_etat_1
      ? data.nombre_ressources_etat_1
      : 0,
  };
}
