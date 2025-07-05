import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { login } from '../store/slice/authSlice.js'
import axiosInstance from "../utils/axiosInstance.js";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await axiosInstance.post("/api/auth/register", form);
      console.log("Signup success:", response.data);

      dispatch(login(response.data.user));
      navigate({ to: '/dashboard' });
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div

        className="w-full max-w-sm bg-[#F1F1F1] backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {error && (
          <div className="text-red-600 text-sm text-center mb-2">{error}</div>
        )}
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-1.657 0-3.236-.336-4.675-.938" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.121-2.121A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-1.657.336-3.236.938-4.675M4.929 4.929A9.956 9.956 0 012 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-1.657-.336-3.236-.938-4.675" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          Sign Up
        </button>
        <div className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/auth" className="text-blue-600 hover:underline">
            Login here..
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup