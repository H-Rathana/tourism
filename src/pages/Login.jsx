import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

login(data);

const redirectTo =
  location.state?.from || "/";

const openBooking =
  location.state?.openBooking || false;

// Normal login
if (!openBooking) {

  toast.success(
    `Welcome back, ${data.user.name}! 👋`,{duration: 6000,}
  );

}

// Redirect user
navigate(
  redirectTo,
  {
    replace: true,
    state: {
      openBooking
    }
  }
);
  };

  return (
   <div
      className=" min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md text-white text-center px-6">

        <h1 className="text-4xl font-bold mb-2">WanderEscape</h1>
        <p className="mb-8 text-lg">Sign In</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email or Username"
              className="w-full bg-transparent border-b border-white/70 focus:outline-none py-2 placeholder-white/70 focus:border-white focus:scale-105 
           transition duration-300 ease-in-out"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent border-b border-white/70 focus:outline-none py-2 placeholder-white/70 focus:border-white focus:scale-105 
           transition duration-300 ease-in-out"
            />
             <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-white/70 hover:text-white"
            >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
  </button>
          </div>

          {/* Button */}
          <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-md mt-4">
            Login
          </button>

        </form>

        <p className="text-sm mt-4 opacity-80 cursor-pointer">
          Forgot Password?
        </p>

        <p className="text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register", {
                state: location.state,
              })}
            className="font-semibold underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;