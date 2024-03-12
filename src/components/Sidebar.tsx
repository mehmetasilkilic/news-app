import { useState } from "react";
import { Link } from "react-router-dom";

import CloseIcon from "../assets/CloseIcon";
import HamburgerIcon from "../assets/svgs/HamburgerIcon";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:flex h-14 md:h-full md:flex-shrink-0">
      <div className="md:hidden flex flex-shrink-0 bg-gray-800 items-center justify-between ">
        <div className="text-white font-bold px-4">
          <Link to="/" onClick={() => setIsOpen(false)}>
            News App
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className=" text-white p-4 focus:outline-none"
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>
      <div
        className={`bg-gray-800  ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden md:w-64 md:transition-all md:duration-300 md:transform md:ease-in-out`}
      >
        <div className="px-4">
          <div className="text-white font-bold py-4 md:block hidden">
            <Link to="/" onClick={() => setIsOpen(false)}>
              News App
            </Link>
          </div>
          <div className="mt-4">
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
    </div>
  );
};

export default Sidebar;
