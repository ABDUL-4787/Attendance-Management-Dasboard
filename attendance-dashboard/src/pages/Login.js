import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      login({ email, password });
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        {/* Replace the src with your image path. For example: "/my-photo.jpg" in public */}
        <img src="/login-bg.jpg" alt="Login background" />
      </div>
      <div className="auth-panel">
        <div className="auth-card">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            {/* Place your logo file in public as /dsi-logo.png or tell me another path */}
            <img src="/dsi-logo.png" alt="DSI Logo" style={{ height: 48, objectFit: "contain" }} />
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label>Email</label>
              <input
                style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Password</label>
              <input
                style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? (
              <div style={{ color: "#f44336", marginBottom: 12 }}>{error}</div>
            ) : null}
            <button type="submit" className="btn present active" style={{ width: "100%" }}>Login</button>
          </form>
          <div style={{ marginTop: 16 }}>
            First time..? <Link to="/signup">Create new account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


