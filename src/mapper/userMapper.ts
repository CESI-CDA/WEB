import { IUser } from "interfaces";

export function userMapper(users: Array<any>): Array<IUser> {
  console.log(users);

  const data = users.map((d) => {
    return {
      id: d.id ? d.id : "N/A",
      nom: d.nom ? d.nom : "N/A",
      prenom: d.prenom ? d.prenom : "N/A",
      email: d.email ? d.email : "N/A",
      role: d.role ? d.role : "N/A",
      date: d.get_lien_user_restriction
        ? d.get_lien_user_restriction.date
        : null,
    };
  });

  return data;
}

export default userMapper;
