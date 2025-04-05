import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import "./login.scss"; 

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loging, setLoging] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    setLoging(true);
  
    const result = await login(form);
    if (result.success) {
      setLoging(false);
      window.location.href = "/home";
    } else {
      setLoging(false);
      setError(result.message); // Show error message
    }
  };

  return (
    <div className="login-container login-page" >
      <div className="login-box">
        <div className="side-bar"></div>
        <h2 className="login-title">ACCOUNT LOGIN</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="input-label">USERNAME</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label className="input-label">PASSWORD</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
            required
          />
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" disabled={loging} className="login-button">{loging == true ? "Please wait..":"LOG IN"}</button>
        </form>

        <div className="login-footer">
          {/* <a href="#" className="footer-link">&larr; View on Behance</a>
          <a href="#" className="footer-link">View on Github &rarr;</a> */}
        </div>

      </div>
    </div>
    
  );
};

export default Login;
