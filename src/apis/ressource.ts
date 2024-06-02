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

// Créer une nouvelle ressource
export async function createRessource(newRes: ICreateRessource, token: string): Promise<string> {
  const response = await fetch(`${API_DEV}/ressources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newRes),
  });

  if (response.ok) {
    return "Ressource créée avec succès";
  } else {
    throw new Error("Error creating resource");
  }
}


// Récupérer les catégories de ressource
export async function getCategories(token: string): Promise<any[]> {

  try {
    const response = await fetch(`${API_DEV}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      return data.items.data; // Retourne uniquement les données des catégories
    } else {
      throw new Error('Error fetching categories');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}


// Récupérer les types de relation
export async function getRelations(token: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_DEV}/relations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      return data.items.data; 
    } else {
      throw new Error('Error fetching relations');
    }
  } catch (error) {
    console.error('Error fetching relations:', error);
    throw error;
  }
}

// Récupérer les types de visibilité
export async function getVisibilities(token: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_DEV}/visibilites`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      return data.items.data; 
    } else {
      throw new Error('Error fetching visibilities');
    }
  } catch (error) {
    console.error('Error fetching visibilities:', error);
    throw error;
  }
}

// Récupérer les types de ressources
export async function getResourcesTypes(token: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_DEV}/typesRessource`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      return data.items.data; 
    } else {
      throw new Error('Error fetching types of resource');
    }
  } catch (error) {
    console.error('Error fetching types of resource:', error);
    throw error;
  }
}

export async function getWaitingRessources(): Promise<IRessource[]> {
  const response = await fetch(`/Mock/ressourceMock.json`);
  if (response.ok) {
    const data = await response.json();
    const waitingRessources = data.ressources.filter(
      (ressource: { id_etat: string }) => ressource.id_etat === "1"
    );
    return waitingRessources;
  } else {
    throw new Error("Error fetch ressources");
  }
}

