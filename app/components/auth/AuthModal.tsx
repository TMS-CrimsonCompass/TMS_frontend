"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import LoginForm from "../Login";
import SignupForm from "../Signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialView = "login" 
}) => {
  const [activeView, setActiveView] = useState<"login" | "signup">(initialView);

  if (!isOpen) return null;

  const handleSwitchToLogin = () => setActiveView("login");
  const handleSwitchToSignup = () => setActiveView("signup");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-2">
          {activeView === "login" ? (
            <LoginForm onSignupClick={handleSwitchToSignup} />
          ) : (
            <SignupForm onLoginClick={handleSwitchToLogin} />
          )}
           {/* OAuth Buttons */}
           <div className="mt-4">
            <button
              onClick={() => signIn("google")}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md mb-2"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("facebook")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Sign in with Facebook
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;