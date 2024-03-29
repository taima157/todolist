import { useEffect, useState } from "react";
import { User } from "../types/user";
import { LoginUser } from "../types/auth.context";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from "jsonwebtoken";

type jwtUser =
  | {
      idUser: string;
      email: string;
    }
  | jwt.JwtPayload
  | string;

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function isLogged() {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      try {
        const decoded: jwtUser = jwt.verify(token, process.env.JWT_SECRET!);
        // const {} = await api.get(`/user/${decoded.idUser}`);
      } catch (error) {
        logoff();
      }
    }
  }

  async function login(user: LoginUser) {
    try {
      const { data }: { data: { token: string } } = await api.post(
        "/login",
        user
      );

      await AsyncStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      throw error;
    }
  }

  async function logoff() {}

  useEffect(() => {
    isLogged();
  }, [token]);

  return { user, login, logoff };
}
