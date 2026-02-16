// Register.jsx

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User", // default role
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return setError("Full name is required"), false;
    if (!form.email.trim()) return setError("Email is required"), false;
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setError("Invalid email format"), false;
    if (!form.password) return setError("Password is required"), false;
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters"), false;
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match"), false;
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // 2️⃣ Store user data in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date().toISOString(),
        isActive: true,
      });

      // 3️⃣ Save token + role
      const token = await userCred.user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("role", form.role);

      // 4️⃣ Show success message
      setSuccess("Registration successful!");
      setError("");

      // 5️⃣ Clear form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "User",
      });

    } catch (err) {
      const errorMessages = {
        "auth/email-already-in-use":
          "Email already registered. Please login.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password too weak.",
      };

      setError(errorMessages[err.code] || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Smart Disaster Alert</h1>
        <h2 className="register-subtitle">Create Account</h2>

        <form className="register-form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

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
              placeholder="Create a password"
              value={form.password}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="User">User</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button className="register-button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
