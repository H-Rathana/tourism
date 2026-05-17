import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // fake notification count (later connect backend)
  const notificationCount = 3;

  return (
    <div className="bg-mist-100 text-black font-bold px-6 py-4 flex justify-between items-center relative z-50 shadow-2xl">
      
      {/* Logo */}
      <div className="text-xl font-bold ml-10">🌴 WanderEscape</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 mr-10 items-center">
        <Link to="/" className="hover:text-sky-400">Home</Link>
        <Link to="/tours" className="hover:text-sky-400">Tour</Link>
        <Link to="/package" className="hover:text-sky-400">Package</Link>
        <Link to="/about" className="hover:text-sky-300">About</Link>

        {/* 🔔 Notification */}
        <div className="relative cursor-pointer">
          <FaRegBell size={22} />
          
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {notificationCount}
            </span>
          )}
        </div>

        {/* 👤 Profile */}
        <div className="relative">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="cursor-pointer"
          >
            <FaRegCircleUser size={24} />
          </div>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </Link>

              <Link
                to="/bookings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Bookings
              </Link>

              <button
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Button */}
      <div
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-40 bg-white shadow-lg flex flex-col items-center gap-4 py-4 md:hidden z-50 rounded-lg">
          <Link to="/">Home</Link>
          <Link to="/tours">Tour</Link>
          <Link to="/package">Package</Link>
          <Link to="/about">About</Link>

          {/* Mobile Icons */}
          <div className="flex gap-4 mt-2">
            <FaRegBell size={20} />
            <FaRegCircleUser size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;