import userMapper from "../mapper/userMapper";
import { IUser } from "interfaces";

export const API_AUTH = "https://api.projet-resources.fr/api";
export const API_DEV = API_AUTH;

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_DEV}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Oops une erreur est survenue lors de la connexion");
    }
  }
}

// export async function getCurrentUser() {
//   return null;
// }

export async function logout() {
  const response = await fetch(`${API_DEV}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
