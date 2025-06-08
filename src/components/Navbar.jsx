import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navLinkClass =
    "transition-colors duration-200 hover:text-blue-400 dark:hover:text-white";

  const activeClass =
    "text-black dark:text-white font-semibold underline underline-offset-4";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-gray-100 w-full dark:bg-gray-900 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Abu Aaisha's Blog
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6 items-center text-gray-700 dark:text-gray-300">
            {links}
            <li>
              <button
                onClick={toggleDarkMode}
                className="hover:text-black dark:hover:text-white cursor-pointer"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
          {links}
          <li>
            <button
              onClick={toggleDarkMode}
              className="hover:text-black dark:hover:text-white"
            >
              {darkMode ? (
                <span className="flex items-center gap-2">
                  <Sun size={18} /> Light Mode
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Moon size={18} /> Dark Mode
                </span>
              )}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
