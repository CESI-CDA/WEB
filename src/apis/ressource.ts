import ressourceMapper from "../mapper/ressourceMapper";
import { IRessource } from "../interfaces";
import { ObjectId } from "../types";

const RESSOURCES_API = "https://projet-resources.fr/api/ressources";

export async function getRessources(
  queryParam?: URLSearchParams
): Promise<IRessource[]> {
  const response = await fetch(
    `${RESSOURCES_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    return ressourceMapper(body.items.data);
  } else {
    throw new Error("Error fetch ressources");
  }
}
export async function getRessource(_id: ObjectId): Promise<IRessource> {
  const response = await fetch(`${RESSOURCES_API}/${_id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error fetch one ressource");
  }
}

export async function deleteRessource(_id: ObjectId): Promise<ObjectId> {
  const response = await fetch(`${RESSOURCES_API}/${_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return _id;
  } else {
    throw new Error("Error delete ressource");
  }
}

export async function updateRessource(
  updatedRessource: Partial<IRessource>
): Promise<IRessource> {
  const { id, ...restRessource } = updatedRessource;
  const response = await fetch(`${RESSOURCES_API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restRessource),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update ressource");
  }
}

export async function createRessource(
  newRessource: Partial<IRessource>
): Promise<IRessource> {
  const response = await fetch(RESSOURCES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRessource),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error create ressource");
  }
}
