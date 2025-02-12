import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-4 mb-2 md:mb-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Instagram
          </a>
        </div>
        <div className="text-sm mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} PlayerOne. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link to="/help" className="hover:text-gray-400">
            Help
          </Link>
          <Link to="/support" className="hover:text-gray-400">
            Support
          </Link>
          <Link to="/donate" className="hover:text-gray-400">
            Donate
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
