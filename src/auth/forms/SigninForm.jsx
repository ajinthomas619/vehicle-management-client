import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { addUser } from "../../redux/slices/userSlice";
import axios from "axios";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (response.status) {
       console.log("the response is",response)
       dispatch (addUser(response.data))
        navigate("/");
      }
    } catch (error) {
      console.log("error in login", error);
      toast.error(response.message)
    }
  };
  return (
    <div className="display-flex flex-col justify-center gap-2 items-center border border-radius-2">
      <form onSubmit={handleSubmit}>
        <div className="border border-radius-6 width-1/2 bg-red-50 mt-16">
        <div className="m-16">
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="m-16">
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="m-16">
          <button className="btn " type="submit">
            Login
          </button>
        </div>
        </div>
      </form>
      <a href="/signup">
     no account yet?signup
      </a>
    </div>
  );
};

export default SigninForm;
