import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking session
    const storedUser = localStorage.getItem("mock_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email: email,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    localStorage.setItem("mock_user", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    setLocation("/");
  };

  const register = async (name: string, email: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUser: User = {
      id: "1",
      name: name,
      email: email,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    localStorage.setItem("mock_user", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    toast({
      title: "Account created",
      description: "Welcome to TaskPilot!",
    });
    setLocation("/");
  };

  const logout = () => {
    localStorage.removeItem("mock_user");
    setUser(null);
    setLocation("/auth");
    toast({
      title: "Logged out",
      description: "See you next time.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
