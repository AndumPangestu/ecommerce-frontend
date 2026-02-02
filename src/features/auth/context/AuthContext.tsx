import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { removeAccessToken } from "@/shared/utils/token";
import * as authService from "@/features/auth/services/auth.service";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  address?: string | null;
  image?: string;
  province?: string;
  city?: string;
  subdistrict?: string;
  zipCode?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  setAuthenticatedUser: (user: User | null) => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const setAuthenticatedUser = (nextUser: User | null) => {
    setUser(nextUser);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.login({ email, password });
      setUser(result.user);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const result = await authService.register({
        ...data,
        password_confirmation: data.password,
      });
      setUser(result.user);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    removeAccessToken();
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (user) {
      setUser({ ...user, ...data });
      return true;
    }
    return false;
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Simulate password change
    return oldPassword.length > 0 && newPassword.length >= 6;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return email.includes("@");
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return token.length > 0 && newPassword.length >= 6;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setAuthenticatedUser,
        updateProfile,
        changePassword,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
