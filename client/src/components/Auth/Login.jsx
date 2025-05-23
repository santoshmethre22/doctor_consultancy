import React, { useState } from "react";
import { useAuth } from "../../context/user.context.jsx";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import "./Login.css";

const Login = () => {
  const { login,user } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { email, password, role } = formData; // ⭐ Correct

    try {
      const res = await login({ email, password, role });
      if (res?.success) { // ⭐ Corrected - no payload
        navigate("/");
      } else {
        setError(res?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Login to your account</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-form">
          <div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEyeOff size={18} /> : <IoIosEye size={18} />}
            </button>
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
          </button>

          
        </div>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <button type="button" onClick={() => navigate("/signup")}>
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
