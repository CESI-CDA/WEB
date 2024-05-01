import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context";
import { login, logout } from "../../apis/auth";
import { IUser } from "interfaces";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialUser = useLoaderData() as IUser | null;
  const [user, setUser] = useState<IUser | null>(initialUser);

  async function loginUser(credentials: { email: string; password: string }) {
    const newUser = await login(credentials);
    setUser(newUser);
  }

  async function logoutUser() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
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
