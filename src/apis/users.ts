import { IUser, UserData } from "interfaces/user.interface";
import userMapper from "../mapper/userMapper";
import { API_DEV } from "./auth";
import { IRessource } from "interfaces";
import ressourceMapper from "../mapper/ressourceMapper";


const API_USERS = "https://projet-resources.fr/api/users";

export async function createUser(newUser: IUser) {
  const response = await fetch(`${API_DEV}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (response.ok) {
    return "utilisateur crée";
  } else {
    throw new Error("Error api createUser");
  }
}
export async function createUserAdmin(newUser: IUser, token: string) {
  const response = await fetch(`${API_DEV}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newUser),
  });

  if (response.ok) {
    return "utilisateur crée";
  } else {
    throw new Error("Error api createUser");
  }
}
export async function getUsers(token: string): Promise<IUser[]> {
  const response = await fetch(`${API_DEV}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    const users = userMapper(data.items.data);
    return users;
  } else {
    throw new Error("Error fetch users");
  }
}

export async function getUserById(userId: number, token: string): Promise<UserData> {
  const response = await fetch(`${API_DEV}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const userData: UserData = await response.json();
    const { user } = userData.item;
    const userObject: IUser = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      pseudonyme: user.pseudonyme,
      email: user.email,
    };
    return userData;
  } else {
    throw new Error("Error fetching user");
  }
}

export async function updateUserById(userId: number, token: string, updatedUserData: Partial<UserData>): Promise<UserData> {
  try {
    const response = await fetch(`${API_DEV}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    });
    if (response.ok) {
      const userData: UserData = await response.json();
      return userData;
    } else {
      throw new Error("Error updating user");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des informations de l'utilisateur:", error);
    throw new Error("Erreur lors de la mise à jour des informations de l'utilisateur");
  }
}

export async function getUserFavorites(userId: string, token: string): Promise<IRessource[]> {
  try {
    const response = await fetch(`${API_DEV}/liensRessourceUserFavoris/favorisFromUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.data && Array.isArray(data.items.data)) {
        const ids = data.items.data.map((item: { id_res: any }) => item.id_res);
        const fetchResourcePromises = ids.map((id: any) =>
          fetch(`${API_DEV}/ressources/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error fetching resource details. Status: " + response.status);
            }
          })
        );
        const resourcesResponses = await Promise.all(fetchResourcePromises);
        const resources: IRessource[] = ressourceMapper(resourcesResponses.map(response => response.item));
        console.log(`resources:`, resources);
        return resources;
      } else {
        console.error("Unexpected response structure:", data);
        return [];
      }
    } else {
      throw new Error("Error fetching user favorites. Status: " + response.status);
    }
  } catch (error) {
    console.error("Error fetching favorite IDs:", error);
    throw error;
  }
}

export async function getUserArchives(userId: string, token: string): Promise<IRessource[]> {
  try {
    const response = await fetch(`${API_DEV}/liensRessourceUserArchive/archivesFromUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.data && Array.isArray(data.items.data)) {
        const ids = data.items.data.map((item: { id_res: any }) => item.id_res);
        const fetchResourcePromises = ids.map((id: any) =>
          fetch(`${API_DEV}/ressources/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error fetching resource details. Status: " + response.status);
            }
          })
        );
        const resourcesResponses = await Promise.all(fetchResourcePromises);
        const resources: IRessource[] = ressourceMapper(resourcesResponses.map(response => response.item));
        console.log(`resources:`, resources);
        return resources;
      } else {
        console.error("Unexpected response structure:", data);
        return [];
      }
    } else {
      throw new Error("Error fetching user favorites. Status: " + response.status);
    }
  } catch (error) {
    console.error("Error fetching favorite IDs:", error);
    throw error;
  }
}

export async function addResourceToFavorites(userId: string, resourceId: number, token: string): Promise<void> {
  try {
    const response = await fetch(`${API_DEV}/liensRessourceUserFavoris`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_res: resourceId,
        id_user: userId,
      }),
    });
    if (!response.ok) {
      throw new Error("Error adding resource to favorites. Status: " + response.status);
    }
  } catch (error) {
    console.error("Error adding resource to favorites:", error);
    throw error;
  }
}

export async function addResourceToArchives(userId: string, resourceId: number, token: string): Promise<void> {
  try {
    const response = await fetch(`${API_DEV}/liensRessourceUserArchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_res: resourceId,
        id_user: userId,
      }),
    });
    if (!response.ok) {
      throw new Error("Error adding resource to archives. Status: " + response.status);
    }
  } catch (error) {
    console.error("Error adding resource to archives:", error);
    throw error;
  }
}

export async function checkFavoriteStatus(resourceId: string, userId: string, token: string): Promise<boolean> {
  try {
      const response = await fetch(
          `${API_DEV}/liensRessourceUserFavoris/${resourceId}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      const data = await response.json();
      return data.status;
  } catch (error) {
      console.error("Erreur lors de la vérification du statut de favori de la ressource:", error);
      throw error;
  }
}

export async function checkArchiveStatus(resourceId: string, userId: string, token: string): Promise<boolean> {
  try {
      const response = await fetch(
          `${API_DEV}/liensRessourceUserArchive/${resourceId}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      const data = await response.json();
      return data.status;
  } catch (error) {
      console.error("Erreur lors de la vérification du statut d'archive de la ressource:", error);
      throw error;
  }
}