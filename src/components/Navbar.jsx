import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-mist-100 text-black font-bold px-6 py-4 flex justify-between items-center relative  z-50 shadow-2xl">
      
      <div className="text-xl font-bold">🌴 WanderEscape</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className=" hover:text-sky-400">Home</Link>
        <Link to="/tours" className=" hover:text-sky-400">Tour</Link>
        <Link to="/destination" className=" hover:text-sky-400">Destination</Link>
        <Link to="/package" className=" hover:text-sky-400">Package</Link>
        <Link to="/about"className=" hover:text-sky-300">About</Link>
      </div>

      {/* Mobile Button */}
      <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-15 right-0 w-22 bg-gray-400 flex flex-col items-center gap-4 py-4 md:hidden  z-50">
          <Link to="/">Home</Link>
          <Link to="/tours">Tour</Link>
          <Link to="/destination">Destination</Link>
          <Link to="/package">Package</Link>
          <Link to="/about">About</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;