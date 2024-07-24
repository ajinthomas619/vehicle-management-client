import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
  
    if (!email || !password || !username || !fullname || !phone || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          username,
          fullname,
          phone,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error in signup", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="border border-radius-2 bg-red-50 p-8 max-w-md mx-auto mt-10 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="btn w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Signup
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <a href="/login" className="text-indigo-600 hover:underline">
          Already a user? Login
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
