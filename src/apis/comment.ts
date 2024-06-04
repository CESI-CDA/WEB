import { commentMapper } from "../mapper/commentMapper";
import { API_AUTH, API_DEV } from "./auth";
import { ICommentaire } from "../interfaces/commentaire.interface";

export async function getComments(token: string): Promise<ICommentaire[]> {
  const response = await fetch(`${API_DEV}/liensRessourceCommentaire`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    const comments = await commentMapper(data.items.data);
    return comments;
  } else {
    throw new Error("Error fetch comments");
  }
}

export async function acceptComment(id: number, token: string, etat: number) {
  const response = await fetch(
    `${API_DEV}/liensRessourceCommentaire/update-etat/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_etat: etat }),
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update comment");
  }
}
