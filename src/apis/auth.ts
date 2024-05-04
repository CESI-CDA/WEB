const API_AUTH = "https://projet-resources.fr";

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_AUTH}/login`, {
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

export async function getCurrentUser() {
  // const response = await fetch(`${API_AUTH}/current`);
  // return response.json();
  // return {
  //   id: 4,
  //   nom: "Forestier",
  //   prenom: "Julien",
  //   pseudonyme: "JulienForestier",
  //   email: "julien.forestier@viacesi.fr",
  // };
  return null;
}

export async function logout() {
  await fetch(API_AUTH, {
    method: "DELETE",
  });
}
