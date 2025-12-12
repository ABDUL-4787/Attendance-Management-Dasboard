import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../auth";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Dashboard</Link>
      <Link to="/visuals" className="nav-link">Visuals</Link>
      <span style={{ marginLeft: "auto" }} />
      {user ? (
        <button
          className="btn nav-btn"
          onClick={() => { logout(); navigate("/login", { replace: true }); }}
        >
          Logout
        </button>
      ) : null}
    </nav>
  );
};

export default NavBar;


