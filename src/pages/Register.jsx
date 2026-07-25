import { useState } from "react";
import { BASE_URL } from "../services/api";
import { useNavigate , useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  // Full Name
if (form.name.trim().length < 3) {
  toast.error("Full name must be at least 3 characters.");
  return;
}

// Name validation
const nameRegex = /^[A-Za-z\s]+$/;

if (!nameRegex.test(form.name)) {
  toast.error("Full name can only contain letters.");
  return;
}

// Email
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(form.email)) {
  toast.error("Please enter a valid email.");
  return;
}

// Password
const passwordRegex =
  /^(?=.*[a-z]).{8,}$/;

if (!passwordRegex.test(form.password)) {

  toast.error(
    "Password must contain at least 8 characters, uppercase, lowercase, number."
  );

  return;

}

// Confirm Password
if (form.password !== form.confirmPassword) {

  toast.error("Passwords do not match.");

  return;

}
  

setLoading(true);
  try {

    // Register user
    const registerRes = await fetch(
      `${BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const registerData =
      await registerRes.json();

    if (!registerRes.ok) {

      toast.error(
        registerData.message
      );

      return;

    }
    const redirectTo =
    location.state?.from || "/";
    // Auto Login
    const loginRes = await fetch(
      `${BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          email: form.email,

          password: form.password,

        }),
      }
    );

    const loginData =
      await loginRes.json();

    if (!loginRes.ok) {

      toast.error(
        "Registration successful, but auto login failed."
      );

      navigate("/login");

      return;

    }

    // Save authentication
    localStorage.setItem(
      "token",
      loginData.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(loginData.user)
    );

    login(loginData);

     navigate(redirectTo, {
        replace: true,
        state: {
          openBooking:
            location.state?.openBooking || false,
        },
      });

    toast.success(
  `🎉 Welcome to WanderEscape, ${loginData.user.name}!`,
    {duration: 6000,}
);

   

  } catch (error) {

    console.error(error);

    toast.error(
      "Something went wrong."
    );

  }finally {

  setLoading(false);

}


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
          type="text"
            name="name"
            placeholder="Full Name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/70 py-2 placeholder-white/70 focus:border-white focus:scale-105 
           transition duration-300 ease-in-out 
           focus:outline-none "
            
          />

          <input
          type="email"
            name="email"
            value={form.email}
            autoComplete="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/70 focus:outline-none py-2 placeholder-white/70 focus:border-white focus:scale-105 
           transition duration-300 ease-in-out"
          />

          <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            value={form.password}
              name="password"
              autoComplete="new-password"
              onChange={handleChange}
              placeholder="(Strong Password)"
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
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-transparent border-b
              border-white/70
              py-2
              placeholder-white/70
              focus:outline-none
              focus:border-white
              focus:scale-105
              transition
              duration-300
              "
            />
             <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-2 text-white/70 hover:text-white"
            >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
  </button>

          </div>

          <button
          type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3

              rounded-md

              mt-4

              disabled:opacity-60
              disabled:cursor-not-allowed
            "
            >

            {loading
              ? "Creating Account..."
              : "Register"}

            </button>

        </form>

        <p className="text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate("/login", {
                state: location.state,
              })
            }
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