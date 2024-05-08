export interface IUser {
  nom: string;
  prenom: string;
  pseudonyme?: string;
  email: string;
  password?: string;
  id_rol?: number;
}

export interface IContextAuth {
  user: IUser | null;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
}
