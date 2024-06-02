import { createContext } from "react";
import { IContextAuth } from "../interfaces";

export const AuthContext = createContext<
  IContextAuth | null | Partial<IContextAuth>
>(null);
