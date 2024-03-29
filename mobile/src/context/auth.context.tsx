import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextType, LoginUser } from "../types/auth.context";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";
import JWT from "expo-jwt";

type PropsType = {
  children: ReactNode;
};

interface jwtUser {
  idUser: string;
  email: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logoff: async () => {},
});

export function AuthProvider({ children }: PropsType) {
  const { user, loading, login, logoff } = useAuth();

  return (
    <AuthContext.Provider value={{ user, login, logoff }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
