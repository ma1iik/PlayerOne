import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfileData(data.profile);
        console.log("✅ Profile data fetched:", data);
      } catch (err) {
        setError(err.message);
        console.error("❌ Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        localStorage.removeItem("accessToken");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="glass p-4 h-16 flex justify-between items-center border-b border-gray-700">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {loading && (
          <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse" />
        )}
        {profileData && (
          <div className="flex items-center gap-2">
            <img
              src={`https://ui-avatars.com/api/?name=${profileData.username}&background=0D8ABC&color=fff`}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-white">
                {profileData.username}
              </p>
              <p className="text-xs text-gray-300">{profileData.email}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            Error loading profile: {error}
          </div>
        )}
      </div>

      {/* Navigation and Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PlayerOne
          </span>
        </div>
        <nav className="flex gap-4">
          <Link to="/Home" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/inventory" className="text-white hover:text-gray-300">
            Inventory
          </Link>
          <Link to="/shop" className="text-white hover:text-gray-300">
            Shop
          </Link>
        </nav>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span role="img" aria-label="Gem" title="Gems">
            💎
          </span>
          <span className="text-white">123</span>
          <span role="img" aria-label="Coin" title="Coins">
            🪙
          </span>
          <span className="text-white">456</span>
        </div>
        <button className="hover:text-gray-300" title="Sync Data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v6h6M20 20v-6h-6M5.64 18.36a9 9 0 1112.72 0"
            />
          </svg>
        </button>
        <button className="hover:text-gray-300" title="Notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <div className="relative" ref={profileRef}>
          <button
            className="hover:text-gray-300"
            title="Profile"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A8.966 8.966 0 0112 15c2.485 0 4.743.99 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50">
              <ul className="py-2">
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-600">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/stats" className="block px-4 py-2 hover:bg-gray-600">
                    Stats
                  </Link>
                </li>
                <li>
                  <Link to="/achievements" className="block px-4 py-2 hover:bg-gray-600">
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-600">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/subscription" className="block px-4 py-2 hover:bg-gray-600">
                    Subscription
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-600"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;