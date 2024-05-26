import { IUser, UserData } from "interfaces/user.interface";
import userMapper from "../mapper/userMapper";
import { API_DEV } from "./auth";

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