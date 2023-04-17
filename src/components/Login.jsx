import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess("User Login Sucessful");
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setSuccess("");
      });
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Login Here</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Type Your Email"
            className="px-4 py-2 border-2 rounded-sm border-indigo-300"
            required
            // onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type Your Password"
            className="px-4 py-2 border-2 rounded-sm border-indigo-300"
            required
            // onBlur={handlePasswordBlur}
          />
        </div>
        <input
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 cursor-pointer"
          type="submit"
          value="Login"
        />
      </form>

      <p className="text-lg mt-4">
        No Account? Sign up{" "}
        <Link to="/register" className="text-blue-400 hover:underline">
          here
        </Link>
      </p>
      <p className="text-rose-600 text-sm">{error}</p>
      <p className="text-green-500 text-sm">{success}</p>
    </div>
  );

};

export default Login;
