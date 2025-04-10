"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onSignupClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { closeAuthModal } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
      });
      
      if (result?.error) {
        setError(result.error);
      } else {
        // Close the modal on successful login
        closeAuthModal();
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block w-full md:w-1/2">
        <img 
          src="/images/tokyo.jpg" 
          alt="Login Visual" 
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Login</h2>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
          
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={onSignupClick}
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>

        {/* --- OAuth Section --- */}
      <div className="mt-6">
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md"
          >
            <span>G</span> Sign in with Google
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            <span>f</span> Sign in with Facebook
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
