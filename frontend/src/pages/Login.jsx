// Login.jsx

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const validateForm = () => {
    if (!form.email.trim()) return setError("Email required"), false;
    if (!form.password) return setError("Password required"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // 1️⃣ Login with Firebase Auth
      const userCred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const token = await userCred.user.getIdToken();
      localStorage.setItem("token", token);

      // 2️⃣ Get role from Firestore
      const userDoc = await getDoc(doc(db, "users", userCred.user.uid));

      if (!userDoc.exists()) {
        setError("User data not found.");
        return;
      }

      const userData = userDoc.data();
      const role = userData.role;

      localStorage.setItem("role", role);

      // 3️⃣ Redirect by role
      if (role === "Admin") {
        navigate("/admin-dashboard");
      } else if (role === "Volunteer") {
        navigate("/volunteer-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      const errorMessages = {
        "auth/user-not-found": "User not found.",
        "auth/wrong-password": "Wrong password.",
        "auth/invalid-email": "Invalid email.",
        "auth/too-many-requests": "Too many attempts.",
      };

      setError(errorMessages[err.code] || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Smart Disaster Alert</h1>
        <h2 className="login-subtitle">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
