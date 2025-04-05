"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";

interface AuthContextProps {
  isAuthModalOpen: boolean;
  openAuthModal: (view?: "login" | "signup") => void;
  closeAuthModal: () => void;
  initialModalView: "login" | "signup";
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialModalView, setInitialModalView] = useState<"login" | "signup">("login");
  const { data: session, status } = useSession();

  const openAuthModal = (view: "login" | "signup" = "login") => {
    setInitialModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        initialModalView,
        isAuthenticated: !!session,
        isLoading: status === "loading",
        user: session?.user,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
};