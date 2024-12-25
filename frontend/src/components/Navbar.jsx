import { Bike } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log();
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  // Check for login and user details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) setUserInitial(userEmail.charAt(0).toUpperCase());

      const fetchedAvatarSrc = localStorage.getItem("avatarSrc");
      setAvatarSrc(fetchedAvatarSrc || "https://via.placeholder.com/40");
    } else {
      setIsLoggedIn(false);
      setUserInitial("");
      setAvatarSrc("");
    }
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userEmail");
    // localStorage.removeItem("avatarSrc");
    // navigate("/login");
    // setIsLoggedIn(false);
    // setUserInitial("");
    // setAvatarSrc("");
  };

  return (
    <header className="bg-black text-white px-4 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center">
          <Bike className="h-8 w-8 mr-2" />
          <span className="text-lg font-semibold">Bike Rental Service</span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link className="hover:text-blue-400" to="/">
            Home
          </Link>
          <Link className="hover:text-blue-400" to="/bikes">
            Bikes
          </Link>
          <Link className="hover:text-blue-400" to="/services">
            Services
          </Link>
          {isLoggedIn ? (
            <>
              <Link className="hover:text-blue-400" to="/my-orders">
                My Orders
              </Link>
              <Link className="hover:text-blue-400" to="/my-bike">
                My Bike
              </Link>
              <Link className="hover:text-blue-400" to="/add-bike">
                Add Bike
              </Link>
              {isAdmin && (
                <Link className="hover:text-blue-400" to="/admin-dashboard">
                  Admin Dashboard
                </Link>
              )}
              <div className="relative">
                <Avatar
                  src={avatarSrc}
                  alt="User Avatar"
                  size="40px"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-48">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-red-600"
                    >
                      Logoutsss
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              to="/auth"
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 text-white px-4 py-4 space-y-4">
          <Link className="block hover:text-blue-400" to="/">
            Home
          </Link>
          <Link className="block hover:text-blue-400" to="/bikes">
            Bikes
          </Link>
          <Link className="block hover:text-blue-400" to="/services">
            Services
          </Link>
          {isLoggedIn ? (
            <>
              <Link className="block hover:text-blue-400" to="/my-orders">
                My Orders
              </Link>
              <Link className="block hover:text-blue-400" to="/my-bike">
                My Bike
              </Link>
              <Link className="block hover:text-blue-400" to="/add-bike">
                Add Bike
              </Link>
              <div className="block mt-4">
                <button
                  onClick={handleLogout}
                  className="block bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              className="block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              to="/auth"
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
