import { useEffect, useState } from "react";
import { User } from "../types/user";
import { LoginUser } from "../types/auth.context";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwt from "jsonwebtoken";
import JWT from "expo-jwt";

interface jwtUser {
  idUser: string;
  email: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function isLogged() {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    try {
      if (token) {
        const decoded = JWT.decode<jwtUser>(token, process.env.JWT_SECRET!);
        console.log(decoded);

        const { data }: { data: User } = await api.get(
          `/user/${decoded.idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(data);

        return;
      }

      throw new Error();
    } catch (error) {
      console.log(error);
      await logoff();
    } finally {
      setLoading(false);
    }
  }

  async function login(user: LoginUser) {
    try {
      const { data }: { data: { token: string } } = await api.post(
        "/auth/login",
        user
      );

      console.log(data);

      await AsyncStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      throw error;
    }
  }

  async function logoff() {
    console.log("LOGOFF");
    setUser(null);
    await AsyncStorage.removeItem("token");
  }

  useEffect(() => {
    isLogged();
  }, [token]);

  return { user, loading, login, logoff };
}
