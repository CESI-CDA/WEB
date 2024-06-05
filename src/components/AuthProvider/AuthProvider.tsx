import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { login, logout } from "../../apis/auth";
import { IUser } from "interfaces";
import userMapper from "../../mapper/userMapper";
import { set } from "react-hook-form";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const context = useContext(AuthContext);
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<IUser | null>(
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

    setUser(userMapped);
    setToken(user.token);
    localStorage.setItem("user", JSON.stringify(userMapped));
    localStorage.setItem("token", user.token);
  }

  async function logoutUser() {
    await logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
