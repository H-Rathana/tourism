import { NavLink, Link } from "react-router-dom";
import { useState, useEffect} from "react";
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


const [user, setUser] =
  useState(
    JSON.parse(
      localStorage.getItem("user")
    ) || {}
  );



const handleLogout = () => {

  setNotifications([]);

  setProfileOpen(false);

  setNotificationOpen(false);

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  navigate("/login");

};


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
useEffect(() => {

  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        const res =
          await fetch(
            "http://localhost:5000/api/users/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await res.json();

        setUser(data);

      } catch(error){

        console.log(error);

      }

    };

  fetchProfile();

}, []);
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
            <div className="relative">

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
            <div className="relative">

              <button
                onClick={() => {

    const token =
      localStorage.getItem(
        "token"
      );

    const user =
      localStorage.getItem(
        "user"
      );

    if (
      !token ||
      !user
    ) {

      navigate("/login");
      return;

    }

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
    onClick={handleLogout}
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

        {/* Mobile Menu */}
        {menuOpen && (

          <div
            className="
            lg:hidden
            py-6
            flex
            flex-col
            gap-5
            border-t
            "
          >
            <Link to="/">Home</Link>
            <Link to="/destinations">
              Destinations
            </Link>
            <Link to="/tours">
              Tours
            </Link>
            <Link to="/travel-guides">
              Travel Guides
            </Link>
            <Link to="/my-bookings">
              My Bookings
            </Link>
            <Link to="/about-us">
              About us
            </Link>
            <Link to="/contact-us">
              Contact us
            </Link>
           <div className="relative">

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
      bottom-12
      left-0
      w-80
      max-h-80
      overflow-y-auto
      bg-white
      rounded-2xl
      shadow-2xl
      border
      z-50
      "
    >
      <div className="p-4 border-b">
        <h3 className="font-semibold">
          Notifications
        </h3>
      </div>

      {notifications.length === 0 ? (
        <div className="p-4 text-gray-500">
          No notifications
        </div>
      ) : (
        notifications.map(
          (notification) => (
            <div
              key={
                notification.notification_id
              }
              onClick={() =>
                handleReadNotification(
                  notification.notification_id
                )
              }
              className={`
                p-4
                border-b
                cursor-pointer
                hover:bg-slate-50
                ${
                  !notification.is_read
                    ? "bg-blue-50"
                    : ""
                }
              `}
            >
              <p className="text-sm">
                {notification.message}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(
                  notification.created_at
                ).toLocaleString()}
              </p>
            </div>
          )
        )
      )}
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