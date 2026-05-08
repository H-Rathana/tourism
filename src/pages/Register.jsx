import { useState } from "react";
import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
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

    toast.success('Account registered Successfully!')
    navigate("/login");
  };

  return (
     <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md text-white text-center px-6">

        <h1 className="text-4xl font-bold mb-2">Create Account</h1>
        <br></br>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/70 py-2 placeholder-white/70 focus:border-white focus:scale-105 
           transition duration-300 ease-in-out 
           focus:outline-none "
            
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/70 focus:outline-none py-2 placeholder-white/70 focus:border-white focus:scale-105 
           transition duration-300 ease-in-out"
          />

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

          <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-md mt-4">
            Register
          </button>

        </form>

        <p className="text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;