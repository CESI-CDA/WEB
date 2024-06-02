import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context";
import { login, logout } from "../../apis/auth";
import { IUser } from "interfaces";
import userMapper from "../../mapper/userMapper";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const context = useContext(AuthContext);
  const [user, setUser] = useState<IUser | null>(context?.user || null);
  const [token, setToken] = useState<string | null>(null);

  async function loginUser(credentials: { email: string; password: string }) {
    const user = await login(credentials);
    const userMapped = {
      id: user.user.id ? user.user.id : "N/A",
      nom: user.user.nom ? user.user.nom : "N/A",
      prenom: user.user.prenom ? user.user.prenom : "N/A",
      email: user.user.email ? user.user.email : "N/A",
      role: user.user.id_rol ? user.user.id_rol : "N/A",
    };

    setUser(userMapped);
    setToken(user.token);
  }

  async function logoutUser() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
