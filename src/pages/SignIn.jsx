import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Add real authentication
    console.log("Logging in:", form);
    navigate("/dashboard/farmer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Sign In to PlantIQ</h2>
        <div className="space-y-4">
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        </div>
        <Button type="submit" className="mt-6 w-full">Sign In</Button>
        <p className="text-sm mt-4 text-center text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
