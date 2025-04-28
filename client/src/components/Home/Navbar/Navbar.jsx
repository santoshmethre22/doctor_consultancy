import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../../context/user.context.jsx";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    console.log('Successfully logged out');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MediConnect</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
          </>
        ) : (
          <li className="navbar-profile" onClick={toggleProfileMenu}>
            <div className="avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" />
              ) : (
                <span>{user?.name?.charAt(0) || "S"}</span>
              )}
            </div>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="avatar-lg">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="User" />
                    ) : (
                      <span>{user?.name?.charAt(0) || "S"}</span>
                    )}
                  </div>
                  <p className="profile-name">{user?.name}</p>
                  <p className="profile-mobile">{user?.mobile}</p>
                </div>
                <hr />
                <Link 
                  to="/profile" 
                  style={{ background: "blue", color: "white", padding: "5px 10px", borderRadius: "5px", textAlign: "center", display: "block", marginBottom: "10px" }}
                >
                  View Profile
                </Link>
                <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
