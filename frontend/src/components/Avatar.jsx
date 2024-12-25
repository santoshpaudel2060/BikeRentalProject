import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch the user's name and email from localStorage (or use default values)
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "No Email";

  const initial = userName.charAt(0).toUpperCase();

  // Toggle the dropdown menu
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("avatarSrc");
    navigate("/auth");
    window.location.reload();
  };

  // Close dropdown when clicking outside
  const closeDropdown = (e) => {
    if (!e.target.closest(".avatar-container")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div className="avatar-container  inline-block relative">
      {/* Avatar circle */}
      <div
        className="avatar w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full cursor-pointer"
        onClick={toggleDropdown}
      >
        {initial}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="dropdown absolute right-0 mt-2 w-40 bg-black rounded-lg shadow-lg p-2 z-10">
          {/* Display Email */}
          <div className="email text-sm text-white-700 mb-2">{userEmail}</div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="logout-button block w-full text-left px-4 py-2 text-white-700 hover:bg-gray-100 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
