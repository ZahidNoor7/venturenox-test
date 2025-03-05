import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Venturenox
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-500">
            Blogs
          </Link>
          <Link to="/property-search" className="hover:text-gray-500">
            Proprty Search
          </Link>
          <Link to="/chat" className="hover:text-gray-500">
            ChatBot
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center p-4 space-y-3">
          <Link
            to="/"
            className="hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Blogs
          </Link>
          <Link
            to="/property-search"
            className="hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Proprty Search
          </Link>
          <Link
            to="/chat"
            className="hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            ChatBot
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
