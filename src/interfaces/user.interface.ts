export interface IUser {
  nom: string;
  prenom: string;
  pseudonyme?: string;
  email: string;
  password?: string;
  role?: number;
}

export interface IContextAuth {
  token: string | null;
  user: IUser | null;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
}
