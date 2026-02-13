import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../services/firebase";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (form.name.trim().length < 2) {
      setError("Full name must be at least 2 characters");
      return false;
    }
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      
      // Store user data in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        name: form.name,
        email: form.email,
        role: "public",
        createdAt: new Date().toISOString(),
        isActive: true,
      });

      // Get ID token and store
      const token = await userCred.user.getIdToken();
      localStorage.setItem("token", token);
      
      window.location.href = "/dashboard";
    } catch (err) {
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered. Please log in instead.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password is too weak. Use 6+ characters.",
        "auth/operation-not-allowed": "Registration is currently unavailable.",
      };
      setError(errorMessages[err.code] || err.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Smart Disaster Alert</h1>
        <h2 className="register-subtitle">Create Your Account</h2>

        <form onSubmit={submit} className="register-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Enter your password (min 6 characters)"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="form-input"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </div>
    </div>
  );
}
