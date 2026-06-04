import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300  border-t border-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-[length:100%_2px] bg-no-repeat">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">🌴 WanderEscape</h2>
          <p className="mt-4 text-sm text-gray-400">
            Discover amazing destinations and book unforgettable travel experiences with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Tours</li>
            <li className="hover:text-white cursor-pointer">Destinations</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Booking Guide</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Phnom Penh, Cambodia
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +855 889 351 504
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@wanderescape.com
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-white hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:text-white hover:scale-110 transition" />
            <FaTwitter className="cursor-pointer hover:text-white hover:scale-110 transition" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} WanderEscape. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;