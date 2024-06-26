import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextType, LoginUser, SignupUser } from "../types/auth.context";
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
  signup: async () => {},
  logoff: async () => {},
});

export function AuthProvider({ children }: PropsType) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function isLogged() {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    try {
      if (token) {
        const decoded = JWT.decode<jwtUser>(token, process.env.JWT_SECRET!);

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

      await AsyncStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      throw error;
    }
  }

  async function signup(user: SignupUser) {
    try {
      await api.post("/auth/signup", user);
    } catch (error) {
      throw error;
    }
  }

  async function logoff() {
    setUser(null);
    await AsyncStorage.removeItem("token");
  }

  useEffect(() => {
    isLogged();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logoff }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
