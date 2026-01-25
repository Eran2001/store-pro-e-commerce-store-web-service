import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import { mockUser, type User } from "../constants/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "demo@example.com" && password === "password") {
        setUser(mockUser);
        setIsLoading(false);
        return true;
      }

      if (email.includes("@") && password.length >= 6) {
        setUser({
          id: "2",
          email,
          name: email.split("@")[0],
        });
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    },
    [],
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (name && email.includes("@") && password.length >= 6) {
        setUser({
          id: Date.now().toString(),
          email,
          name,
        });
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
