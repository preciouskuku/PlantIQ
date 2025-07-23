import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "../supabaseClient";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    age: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Autofill location using IP geolocation
  useEffect(() => {
    axios.get("https://ipapi.co/json/")
      .then(response => {
        if (response.data && response.data.city) {
          setForm(prev => ({ ...prev, location: response.data.city }));
        }
      })
      .catch(err => console.error("Location fetch error:", err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword, location, age } = form;

    if (!agreedToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    if (parseInt(age) < 13) {
      setError("You must be at least 13 years old to sign up.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, location, age }
      }
    });

    if (signUpError) {
      if (signUpError.message.toLowerCase().includes("user already registered")) {
        setError("An account with this email already exists.");
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    setLoading(false);
    alert("Check your email to confirm your account.");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Create your PlantIQ Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <Input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />

          {/* Password */}
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Input name="location" type="text" placeholder="Location" value={form.location} onChange={handleChange} required />
          <Input name="age" type="number" placeholder="Age (13+)" value={form.age} onChange={handleChange} required />

          {/* Terms & Conditions */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="form-checkbox h-4 w-4 text-primary"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-primary underline">Terms & Conditions</a>
            </span>
          </label>
        </div>

        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>

        <p className="text-sm mt-4 text-center text-muted-foreground">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
