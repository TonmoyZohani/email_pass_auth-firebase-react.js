import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="space-x-4 font-bold">
      <Link className="border-2 border-indigo-400 rounded-md px-4 py-2" to="/">
        Home
      </Link>
      <Link
        className="border-2 border-indigo-400 rounded-md px-4 py-2"
        to="/login"
      >
        Login
      </Link>
      <Link
        className="border-2 border-indigo-400 rounded-md px-4 py-2"
        to="/register"
      >
        Register
      </Link>
    </div>
  );
};

export default Header;
