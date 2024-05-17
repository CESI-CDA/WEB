import userMapper from "../mapper/userMapper";
import { IUser } from "interfaces";

const API_AUTH = "https://projet-resources.fr/api";
export const API_DEV = "http://127.0.0.1:8000/api";

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
    console.log(body);
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
  await fetch(`${API_DEV}/logout`, {
    method: "POST",
  });
}
