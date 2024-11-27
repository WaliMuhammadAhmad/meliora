import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const validateName = (name) => {
    if (!name) return "";
    if (/^[^a-zA-Z]/.test(name)) return "Name must start with alphabets only.";
    if (name.length < 3) return "Name must be at least 3 characters long.";
    if (/[^a-zA-Z\s]/.test(name))
      return "Name must contain only alphabets and spaces.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must contain at least one special character.";
    if (formData.name && password.includes(formData.name))
      return "Password must not contain your name for security reasons.";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email address.";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Perform field-specific validation
    if (name === "name")
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`${styles.input} ${
                formData.name && !errors.name ? styles.valid : styles.invalid
              }`}
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.input} ${
                formData.email && !errors.email ? styles.valid : styles.invalid
              }`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${styles.input} ${
                formData.password && !errors.password
                  ? styles.valid
                  : styles.invalid
              }`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <button type="button" className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.redirectText}>
          Already Registered?{" "}
          <span
            className={styles.link}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </span>
        </p>

        <div className={styles.socialContainer}>
          <button
            type="button"
            className={`${styles.socialButton} ${styles.google}`}
          >
            Sign up with Google
          </button>
          <button
            type="button"
            className={`${styles.socialButton} ${styles.facebook}`}
          >
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
