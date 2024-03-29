import { ReactNode, createContext, useState } from "react";
import { AuthContextType } from "../types/auth.context";
import { User } from "../types/user";

type PropsType = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logoff: async () => {},
});

export function AuthProvider({ children }: PropsType) {
  const [user, setUser] = useState<User | null>(null);

  async function login() {}

  async function logoff() {}

  return (
    <AuthContext.Provider value={{ user, login, logoff }}>
      {children}
    </AuthContext.Provider>
  );
}
