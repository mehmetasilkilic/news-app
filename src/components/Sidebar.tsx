import { useState } from "react";
import { Link } from "react-router-dom";

import CloseIcon from "../assets/CloseIcon";
import HamburgerIcon from "../assets/svgs/HamburgerIcon";
import SearchBar from "./SearchBar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:flex h-14 md:h-full md:flex-shrink-0 bg-blue-500">
      <div className="flex flex-shrink-0 bg-gray-800 ">
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-4 focus:outline-none"
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
        <SearchBar />
      </div>
      <div
        className={`bg-gray-800  ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden md:w-64 md:transition-all md:duration-300 md:transform md:ease-in-out`}
      >
        <div className="p-4">
          <div className="text-white font-bold mb-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              News App
            </Link>
          </div>

          <Link
            to="/"
            className="block py-2 px-4 text-white mb-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 px-4 text-white mb-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 px-4 text-white mb-2"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
