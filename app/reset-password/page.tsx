"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";
import axios from "axios";
import Link from "next/link";

// Inner component that uses useSearchParams
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        token,
        newPassword: password,
      });
      setMessage("Password reset successfully.");
      setSuccess(true);
    } catch (err) {
      setMessage("Error resetting password.");
      setSuccess(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Reset Password</h2>
      <input
        type="password"
        className="w-full px-4 py-2 border rounded mb-4"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Reset Password
      </button>
      
      {message && (
        <div className="mt-4 text-center text-sm text-gray-700">
          <p>{message}</p>
          {success && (
            <Link href="/" className="text-blue-500 hover:underline mt-2 block">
              Go to Homepage
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// Main component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Suspense fallback={
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Loading...</h2>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
