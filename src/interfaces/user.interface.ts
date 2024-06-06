export type IUser = {
  id?: number;
  nom: string;
  prenom: string;
  pseudonyme?: string;
  email: string;
  password?: string;
  id_rol?: number;
  favories?: number[];
  archives?: number[];
  role?: number;
  date?: string;
};

export interface IContextAuth {
  token: string | null;
  user: IUser | null;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
  setArchives: (archives: number[]) => void;
  setFavorites: (favorites: number[]) => void;
}

export interface UserData {
  item: {
    user: IUser;
    getNombreFavoris: number;
    getNombreArchive: number;
  };
}
