import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "../supabaseClient"; // adjust path if needed

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: { full_name: form.name },
    },
  });

  if (error) {
    setErrorMsg(error.message);
  } else {
    setErrorMsg("Check your inbox to confirm your email before signing in.");
    // Don't navigate yet, user must verify email first
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create your PlantIQ Account</h2>
        <div className="space-y-4">
          <Input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>}
        <Button type="submit" className="mt-6 w-full">Sign Up</Button>
        <p className="text-sm mt-4 text-center text-muted-foreground">
          Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
