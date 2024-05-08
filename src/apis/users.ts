import { IUser } from "interfaces/user.interface";
import userMapper from "../mapper/userMapper";

const API_USERS = "https://projet-resources.fr/api/users";

export async function createUser(newUser: IUser) {
  const response = await fetch(API_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newUser,
      id_rol: newUser.id_rol ? newUser.id_rol : 1,
    }),
  });

  if (response.ok) {
    return "utilisateur crée";
  } else {
    throw new Error("Error api createUser");
  }
}

export async function getUsers(): Promise<IUser[]> {
  const response = await fetch(API_USERS);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const users = userMapper(data.items.data);
    return users;
  } else {
    throw new Error("Error fetch users");
  }
}
