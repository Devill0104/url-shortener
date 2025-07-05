import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {useSelector} from "react-redux";
import axiosInstance from "../utils/axiosInstance.js";
import {login} from '../store/slice/authSlice.js'
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try{
        const data = await axiosInstance.post("/api/auth/login", { email, password });
        console.log(data)
        dispatch(login(data.user))
        navigate({to: '/dashboard'})
        console.log(data)
    }
    catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    }
}

  return (
    <div className="flex  items-center justify-center min-h-[60vh] px-4">
      <div
        
        className="w-full max-w-sm bg-[#F1F1F1] backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && (
          <div className="text-red-600 text-sm text-center mb-2">{error}</div>
        )}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
        <div className="text-center text-sm mt-2">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;