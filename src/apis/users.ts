import { IUser, UserData } from "interfaces/user.interface";
import userMapper from "../mapper/userMapper";
import { API_DEV } from "./auth";
import { IRessource } from "interfaces";
import ressourceMapper from "../mapper/ressourceMapper";
import { TIME } from "../pages/Admin/AdminUser/UserManagement/UserManagement";

const API_USERS = "https://projet-resources.fr/api/users";

// Créer un nouvel utilisateur
export async function createUser(newUser: Partial<IUser>) {
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

// Créer un nouvel utilisateur administrateur
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
export async function suspendUser(token: string, id: number, date: TIME) {
  let dateValue = new Date();
  switch (date) {
    case TIME.DAY:
      dateValue.setDate(dateValue.getDate() + 1);
      break;
    case TIME.WEEK:
      dateValue.setDate(dateValue.getDate() + 7);
      break;
    case TIME.MONTH:
      dateValue.setMonth(dateValue.getMonth() + 1);
      break;
  }
  console.log(dateValue.toISOString().replace(/T/, " ").replace(/\..+/, ""));

  const response = await fetch(`${API_DEV}/liens-user-restriction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id_user: id,
      date: dateValue.toISOString().replace(/T/, " ").replace(/\..+/, ""),
      commentaire: "test",
    }),
  });
  if (response.ok) {
    return "utilisateur suspendu";
  } else {
    throw new Error("Error api suspendUser");
  }
}

// Récupèrer tous les utilisateurs
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
export async function getFavorites(id: number, token: string): Promise<any> {
  const response = await fetch(
    `${API_DEV}/liensRessourceUserFavoris/favorisFromUser/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data.items.data;
  } else {
    throw new Error("Error fetching favorites");
  }
}

export async function getArchives(id: number, token: string): Promise<any> {
  const response = await fetch(
    `${API_DEV}/liensRessourceUserArchive/archivesFromUser/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data.items.data;
  } else {
    throw new Error("Error fetching archives");
  }
}

// Récupérer un utilisateur
export async function getUserById(
  userId: number,
  token: string
): Promise<UserData> {
  const response = await fetch(`${API_DEV}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const userData: UserData = await response.json();
    const { user } = userData.item;
    const userObject: Partial<IUser> = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      pseudonyme: user.pseudonyme,
      email: user.email,
      role: user.role,
    };
    return userData;
  } else {
    throw new Error("Error fetching user");
  }
}

// Modifier un utilisateur
export async function updateUserById(
  userId: number,
  token: string,
  updatedUserData: Partial<UserData>
): Promise<UserData> {
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
    console.error(
      "Erreur lors de la mise à jour des informations de l'utilisateur:",
      error
    );
    throw new Error(
      "Erreur lors de la mise à jour des informations de l'utilisateur"
    );
  }
}

// Récupérer les ressources favorites d'un utilisateur
export async function getUserFavorites(
  userId: string,
  token: string
): Promise<IRessource[]> {
  try {
    const response = await fetch(
      `${API_DEV}/liensRessourceUserFavoris/favorisFromUser/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.data && Array.isArray(data.items.data)) {
        const ids = data.items.data.map((item: { id_res: any }) => item.id_res);
        const fetchResourcePromises = ids.map((id: any) =>
          fetch(`${API_DEV}/ressources/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                "Error fetching resource details. Status: " + response.status
              );
            }
          })
        );
        const resourcesResponses = await Promise.all(fetchResourcePromises);
        const resources: IRessource[] = ressourceMapper(
          resourcesResponses.map((response) => response.item)
        );
        return resources;
      } else {
        console.error("Unexpected response structure:", data);
        return [];
      }
    } else {
      throw new Error(
        "Error fetching user favorites. Status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error fetching favorite IDs:", error);
    throw error;
  }
}

// Récupérer les ressources archivées d'un utilisateur
export async function getUserArchives(
  userId: string,
  token: string
): Promise<IRessource[]> {
  try {
    const response = await fetch(
      `${API_DEV}/liensRessourceUserArchive/archivesFromUser/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.data && Array.isArray(data.items.data)) {
        const ids = data.items.data.map((item: { id_res: any }) => item.id_res);
        const fetchResourcePromises = ids.map((id: any) =>
          fetch(`${API_DEV}/ressources/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                "Error fetching resource details. Status: " + response.status
              );
            }
          })
        );
        const resourcesResponses = await Promise.all(fetchResourcePromises);
        const resources: IRessource[] = ressourceMapper(
          resourcesResponses.map((response) => response.item)
        );
        return resources;
      } else {
        console.error("Unexpected response structure:", data);
        return [];
      }
    } else {
      throw new Error(
        "Error fetching user favorites. Status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error fetching favorite IDs:", error);
    throw error;
  }
}

// Mettre une ressource en favori
export async function addResourceToFavorites(
  userId: string,
  resourceId: number,
  token: string
): Promise<void> {
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
      throw new Error(
        "Error adding resource to favorites. Status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error adding resource to favorites:", error);
    throw error;
  }
}

// Mettre une ressource en archive
export async function addResourceToArchives(
  userId: string,
  resourceId: number,
  token: string
): Promise<void> {
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
      throw new Error(
        "Error adding resource to archives. Status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error adding resource to archives:", error);
    throw error;
  }
}

// Supprimer une ressource des favoris
export async function removeResourceFromFavorites(
  userId: string,
  resourceId: string,
  token: string
): Promise<void> {
  try {
    const response = await fetch(
      `${API_DEV}/liensRessourceUserFavoris/${resourceId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la suppression de la ressource des favoris. Statut: " +
          response.status
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la ressource des favoris:",
      error
    );
    throw error;
  }
}

// Supprimer une ressource des archives
export async function removeResourceFromArchives(
  userId: string,
  resourceId: string,
  token: string
): Promise<void> {
  try {
    const response = await fetch(
      `${API_DEV}/liensRessourceUserArchive/${resourceId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la suppression de la ressource des archives. Statut: " +
          response.status
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la ressource des archives:",
      error
    );
    throw error;
  }
}

// Récupérer les ressources d'un utilisateur
export async function getResourcesCreateByUser(
  userId: string,
  token: string
): Promise<IRessource[]> {
  try {
    const response = await fetch(
      `${API_DEV}/ressources/ressourcesCreeFromUtilisateur/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();

      if (data.items && data.items.data && Array.isArray(data.items.data)) {
        // Effectuer une requête pour récupérer les données complètes des ressources
        const fetchResourcePromises = data.items.data.map((item: any) =>
          fetch(`${API_DEV}/ressources/${item.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                "Erreur lors de la récupération des détails de la ressource. Statut: " +
                  response.status
              );
            }
          })
        );

        const resourcesResponses = await Promise.all(fetchResourcePromises);
        const resources: IRessource[] = ressourceMapper(
          resourcesResponses.map((response) => response.item)
        );
        return resources;
      } else {
        console.error("Structure de réponse inattendue:", data);
        return [];
      }
    } else {
      throw new Error(
        "Erreur lors de la récupération des ressources de l'utilisateur. Statut: " +
          response.status
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des ressources de l'utilisateur:",
      error
    );
    throw error;
  }
}

export function deleteUser(id: number, token: string) {
  const response = fetch(`${API_DEV}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function forgotPassword(email: string): Promise<void> {
  const response = await fetch(`${API_DEV}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error sending password reset email");
  }
}

export async function resetPassword(data: {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<void> {
  const response = await fetch(`${API_DEV}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error resetting password");
  }
}
