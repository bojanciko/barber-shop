"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/_lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => { },
});

// Provide Authentication State
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
