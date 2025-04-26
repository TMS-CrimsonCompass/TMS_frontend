"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useAuth } from "@/contexts/AuthContext";

interface SignupFormProps {
  onLoginClick?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onLoginClick }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { closeAuthModal } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError("Password must be at least 8 characters long and include letters and numbers.");
      return;
    }
  
    setError("");
    setIsLoading(true);
  
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://ccmain-hzcbg5c8hzh4dwfc.centralus-01.azurewebsites.net/api";
  
      const response = await fetch(`${backendUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        const errorMessage = data.message || "Registration failed";
        if (data.code === "EMAIL_ALREADY_EXISTS") {
          throw new Error("This email is already registered.");
        }
        throw new Error(errorMessage);
      }
  
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
      });
      
      setIsLoading(false);
      onLoginClick?.(); // Switch to login view

      if (result?.error) {
        setError("Registration successful, but auto-login failed. Please log in manually.");
        if (onLoginClick) onLoginClick();
      } else {
        closeAuthModal();
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
      console.error("Signup error:", error);
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
          <h2 className="text-xl font-semibold">Sign Up</h2>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Re-type Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 disabled:bg-green-400"
          >
            {isLoading ? "Processing..." : "Continue"}
          </button>

          {onLoginClick && (
            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={onLoginClick}
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;