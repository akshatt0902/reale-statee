 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Functional component for Sign Up
function Sign_Up() {
  const [formData, setformData] = useState({}); // State to hold form data
  
  const [error, setError] = useState(null); // State to hold error message
  
  const [loading, setLoading] = useState(false);  // State to show loading state
  
  const navigate = useNavigate(); // Navigation hook

  // Function to handle form input change
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });  // Update formData state with new value
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true
      
      // Make a POST request to signup API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();  // Parse response as JSON
      
      // If signup fails, set error message and return
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      
      // On success, navigate to signin page
      setLoading(false);
      setError(null);
      navigate("/sign-in");

    } catch (error) {
      // On error, set error message
      setLoading(false);
      setError(error.message);
    }
  };

  // Render the Sign Up form
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Sign_Up;