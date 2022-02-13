import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/cryptocurrency.png";

const Navbar = () => {
  return (
    <div className="bg-gray-800 py-8 h-full h-100">
      <div className="flex justify-center border-b border-gray-700 pb-12">
        <Link to="/">
          <img src={Logo} height="50" width="60" />
        </Link>
      </div>
      <div className="block">
        <ul>
        <li className="hover:bg-gray-900 p-5">
            <Link to="/" className="text-white uppercase hover:text-white">
              Home
            </Link>
          </li>
          <li className="hover:bg-gray-900 p-5">
            <Link to="/cryptocurrencies" className="text-white uppercase hover:text-white">
              Cryptocurrencies
            </Link>
          </li>
          <li className="hover:bg-gray-900 p-5">
            <Link to="/news" className="text-white uppercase hover:text-white">
              News
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
