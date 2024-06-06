import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { login, logout } from "../../apis/auth";
import { IUser } from "interfaces";
import userMapper from "../../mapper/userMapper";
import { set } from "react-hook-form";
import { getArchives, getFavorites } from "../../apis/users";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<any | null>(
    storedUser !== null ? JSON.parse(storedUser) : null
  );
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(
    storedToken !== null ? storedToken : null
  );

  async function loginUser(credentials: { email: string; password: string }) {
    const user = await login(credentials);
    const userMapped = {
      id: user.user.id ? user.user.id : "N/A",
      nom: user.user.nom ? user.user.nom : "N/A",
      prenom: user.user.prenom ? user.user.prenom : "N/A",
      email: user.user.email ? user.user.email : "N/A",
      role: user.user.id_rol ? user.user.id_rol : "N/A",
    };
    const favories = await getFavorites(userMapped.id, user.token);
    const favoriesId = favories.map((f) => {
      return f.id_res;
    });
    const archives = await getArchives(userMapped.id, user.token);
    const archivesId = archives.map((a) => {
      return a.id_res;
    });
    const userFully = {
      ...userMapped,
      favories: favoriesId,
      archives: archivesId,
    };

    setUser(userFully);
    setToken(user.token);
    localStorage.setItem("user", JSON.stringify(userFully));
    localStorage.setItem("token", user.token);
  }

  async function logoutUser() {
    await logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  async function setArchives(archives: number[]) {
    setUser({ ...user, archives });
    localStorage.setItem("user", JSON.stringify({ ...user, archives }));
  }
  async function setFavorites(favorites: number[]) {
    setUser({ ...user, favories: favorites });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, favories: favorites })
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loginUser,
        logoutUser,
        setArchives,
        setFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
