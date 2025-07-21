// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "../supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Password reset link sent! Check your inbox.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleReset} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Forgot Password</h2>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p className="text-sm mt-4 text-center text-muted-foreground">{message}</p>}
        <Button type="submit" className="mt-6 w-full">Send Reset Link</Button>
      </form>
    </div>
  );
}
