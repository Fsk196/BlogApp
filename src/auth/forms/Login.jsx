import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice.js";
import { Label } from "../../components/ui/Label.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { BottomGradient, LabelInputContainer } from "../../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import {
  signInAccount,
  getCurrentUser,
  signOutAccount,
} from "../../lib/api.js";
import { account } from "../../lib/appwrite.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Enter Email and Password");
    } else {
      setError("");
      try {
        const session = await signInAccount({ email, password });
        if (session) {
          const currentUser = await getCurrentUser();
          dispatch(login({ userData: currentUser, status: true }));
        }
      } catch (error) {
        setError(
          "Failed to login. Please check your credentials and try again."
        );
        console.log(error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      // Delete sessions and handle logout
      await signOutAccount(); // Assuming signOutAccount is defined elsewhere
      // Redirect to login page after successful logout
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen w-full">
      <h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Blog App
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to your Account
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>
      </form>
      <h2>
        Don't have an Account?{" "}
        <Link to="/sign-up" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </h2>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Login;
