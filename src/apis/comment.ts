import { API_DEV } from "./auth";

export async function getComments(id: string): Promise<unknown[]> {
  const response = await fetch("/Mock/commentsMock.json");
  if (response.ok) {
    const data = await response.json();
    const waitingComments = data.comments.filter(
      (comment: { id_etat: string }) => comment.id_etat === id
    );
    console.log(waitingComments);
    return waitingComments;
  } else {
    throw new Error("Error fetch comments");
  }
}
