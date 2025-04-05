import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../Context/AuthContext";
import "./sidenav.scss";
import { useAppContext } from "../../Context/Context";

function SideNav() {
  const { logout } = useAuth();
  const { activeIcon, handleSetActiveIcon } = useAppContext();



  const handleIconClick = (icon) => {
    handleSetActiveIcon(icon)
    // setActiveIcon(icon); // Set the active icon when clicked
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <div className="side-nav">
      {/* Home */}
      <button
        className={`sidebar-icon btn ${activeIcon === "home" ? "active" : ""}`}
        onClick={() => handleIconClick("home")}
      >
        <i
          className={`bi bi-house-door ${
            activeIcon === "home" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">Home</span>
      </button>

      {/* Customer */}
      <button
        className={`sidebar-icon btn ${
          activeIcon === "inventory" ? "active" : ""
        }`}
        onClick={() => handleIconClick("inventory")}
      >
        <i
          className={`bi bi-box-seam ${
            activeIcon === "inventory" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">Manage Inventory</span>
      </button>

      {/* Tables */}
      <button
        className={`sidebar-icon btn ${
          activeIcon === "tables" ? "active" : ""
        }`}
        onClick={() => handleIconClick("tables")}
      >
        <i
          className={`bi bi-table ${
            activeIcon === "tables" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">Tables</span>
      </button>

      {/* Order */}
      <button
        className={`sidebar-icon btn ${activeIcon === "order" ? "active" : ""}`}
        onClick={() => handleIconClick("order")}
      >
        <i
          className={`bi bi-cart ${
            activeIcon === "order" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">Order</span>
      </button>

      {/* Reports */}
      <button
        className={`sidebar-icon btn ${
          activeIcon === "reports" ? "active" : ""
        }`}
        onClick={() => handleIconClick("reports")}
      >
        <i
          className={`bi bi-file-earmark-bar-graph ${
            activeIcon === "reports" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">Reports</span>
      </button>

      {/* Settings */}
      <button
        className={`sidebar-icon btn ${
          activeIcon === "settings" ? "active" : ""
        }`}
        onClick={() => handleIconClick("settings")}
      >
        <i
          className={`bi bi-gear ${
            activeIcon === "settings" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">Settings</span>
      </button>

      {/* User Profile */}
      <button
        className={`sidebar-icon btn ${
          activeIcon === "userprofile" ? "active" : ""
        }`}
        onClick={() => handleIconClick("userprofile")}
      >
        <i
          className={`bi bi-person-circle ${
            activeIcon === "userprofile" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">User Profile</span>
      </button>

      {/* Log-out */}
      <button
        onClick={handleLogout}
        className={`sidebar-icon btn ${
          activeIcon === "logout" ? "active" : ""
        }`}
      >
        <i
          className={`bi bi-box-arrow-right ${
            activeIcon === "logout" ? "text-danger" : ""
          }`}
        ></i>
        <span className="tooltip">Log-out</span>
      </button>
    </div>
  );
}

export default SideNav;
