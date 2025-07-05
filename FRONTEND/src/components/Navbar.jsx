import React from "react";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav
      className="w-full px-4 py-3 flex items-center justify-between rounded-3xl my-10 mx-auto max-w-4xl
      bg-white/30 backdrop-blur-md shadow-lg border border-white/30"
      style={{ background: "rgba(255, 255, 255, 0.22)" }}
    >

      <div className="w-[100%] text-xl font-bold text-gray-800 select-none">
        <Link
          to="/"> URL Shortener
        </Link>
      </div>

      <div className="flex gap-3">
        {!isAuthenticated ? (
          <>
            <Link
              to="/auth"
              className="flex justify-center items-center py-1 w-[5rem] rounded-sm bg-blue-500 bg-opacity-80 text-white font-semibold shadow hover:bg-blue-400 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex justify-center items-center py-1 w-[5rem] rounded-sm  bg-green-500 bg-opacity-80 text-white font-semibold shadow hover:bg-green-400 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            to="/logout"
            className="flex justify-center items-center py-1 w-[5rem] rounded-sm  bg-red-500 bg-opacity-80 text-white font-semibold shadow hover:bg-red-200 transition"
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;