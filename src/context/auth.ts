import { createContext } from "react";

export type TRole = "admin" | "user";

export interface IContextType {
  email: string;
  username: string;
  role: TRole | null;
  numberOfPillChannels: number;
  isAuth: boolean;
}

export const InitAuthValue: IContextType = {
  email: "",
  username: "",
  numberOfPillChannels: 0,
  role: null,
  isAuth: false,
};

interface IAuthContextType {
  auth: IContextType;
  setAuth: (value: IContextType) => void;
}

export const AuthContext = createContext<IAuthContextType | null>(null);
