import React, { useState, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Initial value
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = (e) => {
    // At the beginning, success and error both will be empty
    e.preventDefault();
    setSuccess("");
    setError("");

    let email = e.target.email.value;
    let password = e.target.password.value;
    let name = e.target.name.value;

    // Validation using regex
    if (!/[A-Z]/.test(password)) {
      setError("Atleast one letter sould be uppercase");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password, name)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setError("");
        setSuccess("User has been created successfully");
        sendVerificationEmail(loggedInUser);
        updateUser(loggedInUser, name);
      })
      .catch((error) => {
        console.log("Error", error.message);
        setError(error.message);
        setSuccess("");
      });
    e.target.reset();
  };

  // To update the user name
  const updateUser = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        alert("Name has been updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Verifying the email
  const sendVerificationEmail = (user) => {
    sendEmailVerification(auth.currentUser).then((result) =>
      alert("Please,Verify Your Email Address")
    );
  };

  // Resetting the password
  const handleResetPassword = (e) => {
    console.log(emailRef.current); // we'll get the full input field
    console.log(emailRef.current.value); // we'll get the full input field's vaule

    const email = emailRef.current.value;
    if (!email) {
      alert("Please,Provide Your Email Address");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please,Check Your Mail");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  // Showing password
  const handleShowPassword = () => {
    // passRef.current.type = "text";
    setShowPassword(!showPassword);
  };

  const handlePasswordBlur = (e) => {
    // console.log(e.target.value);
    // setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    // console.log(e.target.value);
    // setEmail(e.target.value);
  };

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4">Register Here</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Type Your Name"
            id="Name"
            className="border-2 rounded-md py-2 px-3 border-indigo-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef} // using useRef
            placeholder="Type Your Email"
            id="email"
            className="border-2 rounded-md py-2 px-3 border-indigo-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Type Your Password"
              id="password"
              className="border-2 rounded-md py-2 px-3 border-indigo-300 focus:outline-none focus:border-indigo-500 pr-10"
              ref={passRef}
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute top-1/2 transform -translate-y-1/2 right-3 text-indigo-500 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        >
          Register
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Forget Your Password? Please Reset{" "}
          <button
            onClick={handleResetPassword}
            className="text-blue-400 font-medium hover:underline focus:outline-none"
          >
            Reset Password
          </button>
        </p>
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-medium hover:underline focus:outline-none"
          >
            Login here
          </Link>
        </p>
        <p className="text-rose-600">{error}</p>
        <p className="text-green-500">{success}</p>
      </div>
    </div>
  );
};

export default Register;
