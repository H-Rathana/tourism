import { NavLink, Link } from "react-router-dom";
import {
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import {
  Menu,
  X,
  Bell,
  User,
  Heart,
  MapPinned,
  Package,
  Home,
  Info,
  Phone,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logopng.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notifications, setNotifications] =
  useState([]);
 const [wishlistCount, setWishlistCount] =
  useState(0);

const navigate = useNavigate();
const profileRef = useRef(null);
const notificationRef = useRef(null);

const {
  user,
  logout,
} = useContext(AuthContext);

const notificationCount =
  notifications.filter(
    (n) => !n.is_read
  ).length;
  useEffect(() => {

  const fetchNotifications =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        const res =
          await fetch(
            "http://localhost:5000/api/notifications",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await res.json();

        setNotifications(data);

      } catch (error) {

        console.log(error);

      }

    };

  fetchNotifications();

}, []);
const handleReadNotification =
  async (id) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await fetch(
        `http://localhost:5000/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === id
            ? {
                ...n,
                is_read: true,
              }
            : n
        )
      );

    } catch (error) {

      console.log(error);

    }

};
const handleNotificationClick =
  async (notification) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await fetch(
        `http://localhost:5000/api/notifications/${notification.notification_id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setNotifications(
        prev =>
          prev.map(n =>
            n.notification_id ===
            notification.notification_id
              ? {
                  ...n,
                  is_read: true
                }
              : n
          )
      );

      if (
          notification.message
            .toLowerCase()
            .includes("approved")
        ) {

          navigate(
            `/ticket/${notification.booking_id}`
          );

        } else {

          alert(
            "This booking was rejected."
          );

        }

    } catch(error){

      console.log(error);

    }

};
useEffect(() => {

  const fetchWishlist =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        const res =
          await fetch(
            "http://localhost:5000/api/wishlist",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await res.json();

        setWishlistCount(
          data.length
        );

      } catch(error){

        console.log(error);

      }

    };

  fetchWishlist();

}, []);
useEffect(() => {

  const refreshWishlist =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) return;

      const res =
        await fetch(
          "http://localhost:5000/api/wishlist",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await res.json();

      setWishlistCount(
        data.length
      );

    };

  window.addEventListener(
    "wishlistUpdated",
    refreshWishlist
  );

  return () => {

    window.removeEventListener(
      "wishlistUpdated",
      refreshWishlist
    );

  };

}, []);
// useEffect(() => {

//   const fetchProfile =
//     async () => {

//       try {

//         const token =
//           localStorage.getItem(
//             "token"
//           );

//         if (!token) return;

//         const res =
//           await fetch(
//             "http://localhost:5000/api/users/profile",
//             {
//               headers: {
//                 Authorization:
//                   `Bearer ${token}`
//               }
//             }
//           );

//         const data =
//           await res.json();

//         setUser(data);

//       } catch(error){

//         console.log(error);

//       }

//     };

//   fetchProfile();

// }, []);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(
        event.target
      )
    ) {
      setProfileOpen(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(
        event.target
      )
    ) {
      setNotificationOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
const mobileNavClass = `
flex
items-center
gap-4

px-4
py-4

rounded-2xl

text-slate-700
font-medium

hover:bg-sky-50
hover:text-sky-600

transition-all
duration-300
`;
  return (
    <header
      className="
      sticky
      top-0
      z-50
      bg-white/90
      backdrop-blur-lg
      border-b
      border-slate-200
      shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="
            flex items-center gap-3
            text-2xl
            font-bold
            text-slate-900
            "
          >
            <img src={logo} alt="" className="size-20" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 transition
                ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`
              }
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/destinations"
              className={({ isActive }) =>
                `flex items-center gap-2 transition
                ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`
              }
            >
              <MapPinned size={18} />
              Destinations
            </NavLink>

            <NavLink
              to="/tours"
              className={({ isActive }) =>
                `flex items-center gap-2 transition
                ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`
              }
            >
              <Package size={18} />
              Tours
            </NavLink>

            <NavLink
              to="/travel-guides"
              className={({ isActive }) =>
                `flex items-center gap-2 transition
                ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`
              }
            >
              <Package size={18} />
              Travel Guides
            </NavLink>

            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `flex items-center gap-2 transition
                ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`
              }
            >
              <ClipboardList size={18} />
              My Bookings
            </NavLink>

            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `flex items-center gap-2 transition
                ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`
              }
            >
              <Info size={18} />
              About Us
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `flex items-center gap-2 transition
                ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`
              }
            >
              <Phone size={18} />
              Contact Us
            </NavLink>

          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">

            {/* Wishlist */}
             <button
                onClick={() =>
                  navigate("/wishlist")
                }
                className="
                hover:text-red-500
                transition
                relative
                "
              >

                <Heart size={22} />

                {wishlistCount > 0 && (

                  <span
                    className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                    "
                  >
                    {wishlistCount}
                  </span>

                )}

              </button>

            {/* Notifications */}
            <div
                className="relative"
                ref={notificationRef}
              >

              <button
                onClick={() =>
                  setNotificationOpen(
                    !notificationOpen
                  )
                }
                className="relative"
              >
                <Bell size={22} />

                {notificationCount > 0 && (
                  <span
                    className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                    "
                  >
                    {notificationCount}
                  </span>
                )}
              </button>

              {notificationOpen && (

<div
  className="
  absolute
  right-0
  mt-3
  w-96
  bg-white
  rounded-3xl
  shadow-2xl
  border
  overflow-hidden
  z-50
  "
>

  <div className="p-4 border-b">

    <h3 className="font-bold">
      Notifications
    </h3>

  </div>

  <div
    className="
    max-h-96
    overflow-y-auto
    "
  >

    {notifications.length === 0 ? (

      <div className="p-5 text-center text-gray-500">

        No notifications yet

      </div>

    ) : (

      notifications.map(
        (notification) => (

          <div
  key={notification.notification_id}
  onClick={() =>
    handleNotificationClick(
      notification
    )
  }
  className={`
    p-4
    border-b
    cursor-pointer
    hover:bg-sky-50
    transition

    ${
      !notification.is_read
        ? "bg-blue-50"
        : ""
    }
  `}
>

  <p className="text-sm font-medium">
    {notification.message}
  </p>

  <p
    className="
    text-xs
    text-gray-400
    mt-2
    "
  >
     {notification.message
    .toLowerCase()
    .includes("approved")
    ? "Click to view ticket"
    : "Booking rejected"}
  </p>

</div>

        )
      )

    )}

  </div>

</div>

)}

            </div>

            {/* Profile */}
            <div
              className="relative"
              ref={profileRef}
            >

              <button
                onClick={() => {

    if (!user) {

  navigate("/login");

  return;

}

// setProfileOpen(
//   !profileOpen
// );

    setProfileOpen(
      !profileOpen
    );

  }}
              >
                <div
                  className="
                  w-10
                  h-10
                  rounded-full
                  bg-sky-100
                  text-sky-600
                  flex
                  items-center
                  justify-center
                  "
                >
                  {user?.profile_image ? (

                <img
                  src={`http://localhost:5000/uploads/profiles/${user.profile_image}`}
                  alt=""
                  className="
                  w-full
                  h-full
                  rounded-full
                  object-cover
                  "
                />

              ) : (

                <User size={20} />

              )}
                </div>
              </button>

              {profileOpen && (
                <div
  className="
  absolute
  right-0
  mt-3
  w-72
  bg-white
  rounded-3xl
  shadow-2xl
  border
  overflow-hidden
  z-50
  "
>

  {/* Profile Header */}
  <div
    className="
    p-6
    text-center
    border-b
    bg-gradient-to-r
    from-orange-50
    to-orange-100
    "
  >

    <div
      className="
      w-16
      h-16
      mx-auto
      rounded-full
      bg-orange-500
      text-white
      flex
      items-center
      justify-center
      text-xl
      font-bold
      "
    >
      {user?.profile_image ? (

  <img
    src={`http://localhost:5000/uploads/profiles/${user.profile_image}`}
    alt=""
    className="
    w-full
    h-full
    rounded-full
    object-cover
    "
  />

) : (

  user?.name?.charAt(0)

)}
    </div>

    <h3 className="mt-3 font-bold text-lg">
      {user?.name}
    </h3>

    <p className="text-sm text-gray-500">
      {user?.email}
    </p>

  </div>

  {/* Menu */}
  <Link
    to="/edit-profile"
    className="
    block
    px-5
    py-3
    hover:bg-slate-50
    "
  >
    ✏️ Edit Profile
  </Link>

  <Link
    to="/my-bookings"
    className="
    block
    px-5
    py-3
    hover:bg-slate-50
    "
  >
    📋 My Bookings
  </Link>

  <Link
    to="/wishlist"
    className="
    block
    px-5
    py-3
    hover:bg-slate-50
    "
  >
    ❤️ Wishlist
  </Link>

  <button
    onClick={logout}
    className="
    w-full
    text-left
    px-5
    py-3
    text-red-500
    hover:bg-red-50
    "
  >
    🚪 Logout
  </button>

</div>
              )}

            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>


        
{/* ================= MOBILE DRAWER ================= */}

{menuOpen && (
  <div
    className="
    fixed
    inset-0
    z-[9999]
    lg:hidden
"
  >
    {/* Backdrop */}
    <div
  onClick={() => setMenuOpen(false)}
  className="
    absolute
    inset-0
    bg-black/50
    backdrop-blur-sm
"
/>

    {/* Drawer */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        absolute
        top-0
        left-0
        h-screen
        w-[320px]
        max-w-[85%]
        bg-white
        shadow-2xl
        flex
        flex-col
        animate-slide-in
      "
    >

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between px-5 py-4 border-b">

        <img
          src={logo}
          alt="logo"
          className="h-12"
        />

        <button
          onClick={() => setMenuOpen(false)}
          className="text-3xl"
        >
          ×
        </button>

      </div>

      {/* ================= PROFILE ================= */}

      {user ? (

        <div className="p-5 flex items-center gap-4 border-b">

          <div className="w-16 h-16 rounded-full overflow-hidden bg-sky-100">

            {user.profile_image ? (

              <img
                src={`http://localhost:5000/uploads/profiles/${user.profile_image}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center">

                <User
                  size={28}
                  className="text-sky-600"
                />

              </div>

            )}

          </div>

          <div>

            <h3 className="font-bold text-lg">
              {user.name}
            </h3>

            <p className="text-sm text-slate-500">
              {user.email}
            </p>

          </div>

        </div>

      ) : (

        <div className="p-5 border-b">

          <p className="font-semibold mb-4">
            Welcome to WanderEscape
          </p>

          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="
              w-full
              bg-sky-500
              text-white
              py-3
              rounded-xl
              mb-3
            "
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate("/register");
              setMenuOpen(false);
            }}
            className="
              w-full
              border
              border-sky-500
              text-sky-600
              py-3
              rounded-xl
            "
          >
            Create Account
          </button>

        </div>

      )}

      {/* ================= MENU ================= */}

      <div className="flex-1 overflow-y-auto p-4 space-y-2">

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <Home size={22} />
          Home
        </Link>

        <Link
          to="/destinations"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <MapPinned size={22} />
          Destinations
        </Link>

        <Link
          to="/tours"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <Package size={22} />
          Tours
        </Link>

        <Link
          to="/travel-guides"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <MapPinned size={22} />
          Travel Guides
        </Link>

        <Link
          to="/my-bookings"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <ClipboardList size={22} />
          My Bookings
        </Link>

        <Link
          to="/about-us"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <Info size={22} />
          About Us
        </Link>

        <Link
          to="/contact-us"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <Phone size={22} />
          Contact Us
        </Link>

        <div className="border-t my-4" />

        <h3 className="text-xs uppercase tracking-widest text-slate-400 px-2">
          My Account
        </h3>

        <Link
          to="/wishlist"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <Heart
            size={22}
            className="text-red-500"
          />
          Wishlist
        </Link>

        <Link
          to="/notifications"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <Bell size={22} />
          Notifications
        </Link>

        <Link
          to="/edit-profile"
          onClick={() => setMenuOpen(false)}
          className={mobileNavClass}
        >
          <User size={22} />
          Edit Profile
        </Link>

      </div>

      {/* ================= FOOTER ================= */}

      {user && (

        <div className="border-t p-4">

          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Logout
          </button>

        </div>

      )}

    </div>
  </div>
)}
          
      </div>
    </header>
  );
};

export default Navbar;