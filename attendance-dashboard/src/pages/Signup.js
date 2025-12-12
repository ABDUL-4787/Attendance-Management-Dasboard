import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../auth";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      registerUser({ name, email, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", textAlign: "left" }}>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name</label>
          <input
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn present active" style={{ width: "100%" }}>Create account</button>
      </form>
      <div style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;


