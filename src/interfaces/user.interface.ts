export interface IUser {
  id: number;
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

export interface UserData {
  item: {
    user: IUser;
    getNombreFavoris: number;
    getNombreArchive: number;
  };
}