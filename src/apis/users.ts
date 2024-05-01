import { IUser } from "interfaces/user.interface";

const API_USERS = "https://projet-resources.fr/api/users";

export async function createUser(newUser: IUser) {
  const response = await fetch(API_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newUser, id_rol: 1 }),
  });

  if (response.ok) {
    return "utilisateur crée";
  } else {
    throw new Error("Error api createUser");
  }
}
