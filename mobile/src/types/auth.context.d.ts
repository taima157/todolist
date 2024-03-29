import { User } from "./user";

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (loginUser: LoginUser) => Promise<void>;
  logoff: () => void;
}
