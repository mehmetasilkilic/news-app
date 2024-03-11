import { useState } from "react";
import { Link } from "react-router-dom";

import CloseIcon from "../assets/CloseIcon";
import HamburgerIcon from "../assets/svgs/HamburgerIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">
          <Link to="/">News App</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
          <Link to="/contact" className="text-white">
            Contact
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        <div
          className={`md:hidden absolute h-full top-14 left-0 right-0 bg-gray-800 overflow-hidden transition-all duration-300 transform ${
            isOpen
              ? "h-auto opacity-100 translate-y-0"
              : "h-0 opacity-0 translate-y-full"
          }`}
        >
          <Link to="/" className="block py-2 px-4 text-white">
            Home
          </Link>
          <Link to="/about" className="block py-2 px-4 text-white">
            About
          </Link>
          <Link to="/contact" className="block py-2 px-4 text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
