import ressourceMapper from "../mapper/ressourceMapper";
import { IRessource } from "../interfaces";
import { ObjectId } from "../types";
import { API_DEV } from "./auth";

const API = "https://projet-resources.fr/api/ressources";

export async function getRessources(
  queryParam?: URLSearchParams
): Promise<IRessource[]> {
  const response = await fetch(
    `${API_DEV}/ressources${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    return ressourceMapper(body.items.data);
  } else {
    throw new Error("Error fetch ressources");
  }
}
export async function getRessource(id: ObjectId): Promise<IRessource> {
  const response = await fetch(`${API_DEV}/ressources/${id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error fetch one ressource");
  }
}

export async function deleteRessource(
  _id: ObjectId,
  token: string
): Promise<ObjectId> {
  const response = await fetch(`${API_DEV}/ressources/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    return _id;
  } else {
    throw new Error("Error delete ressource");
  }
}

export async function updateRessource(
  updatedRessource: Partial<IRessource>,
  token: string
): Promise<IRessource> {
  const { id, ...restRessource } = updatedRessource;
  const response = await fetch(`${API_DEV}/ressources/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  newRessource: Partial<IRessource>,
  token: string
): Promise<IRessource> {
  const response = await fetch(`${API_DEV}/ressources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newRessource),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error create ressource");
  }
}
