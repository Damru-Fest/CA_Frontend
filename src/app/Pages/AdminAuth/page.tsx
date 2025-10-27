"use client";

import { useState, useEffect } from "react";

const AdminAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if already logged in (on page load)
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      sessionStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
      window.location.href = "/"
      // You can redirect to admin dashboard here
      // window.location.href = "/admin/dashboard";
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white">
      {!isLoggedIn ? (
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-80">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded mt-4 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-purple-400">
            Welcome, Admin 🎉
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAuth;
