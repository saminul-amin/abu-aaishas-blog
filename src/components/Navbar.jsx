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
    "relative px-4 py-2 font-medium transition-all duration-300 hover:text-gray-800 dark:hover:text-white group";

  const activeClass = "text-gray-800 dark:text-white font-semibold";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-slate-600 group-hover:w-full transition-all duration-300"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-slate-600 group-hover:w-full transition-all duration-300"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          Blog
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-slate-600 group-hover:w-full transition-all duration-300"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          Categories
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-slate-600 group-hover:w-full transition-all duration-300"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-me"
          className={({ isActive }) =>
            `${navLinkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-slate-600 group-hover:w-full transition-all duration-300"></span>
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-300 to-slate-300 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                  Abu Aaisha's Blog
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1">
              <ul className="flex space-x-1 items-center">{links}</ul>

              {/* Dark Mode Toggle */}
              <div className="ml-6 relative">
                <button
                  onClick={toggleDarkMode}
                  className="relative p-2 rounded-full bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-slate-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  aria-label="Toggle Dark Mode"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 rounded-full blur opacity-40"></div>
                  <div className="relative">
                    {darkMode ? (
                      <Sun size={20} className="text-yellow-500" />
                    ) : (
                      <Moon size={20} className="text-gray-700" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="relative p-2 rounded-full bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-slate-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 rounded-full blur opacity-40"></div>
                <div className="relative">
                  {isOpen ? (
                    <X size={24} className="text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Menu
                      size={24}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl animate-slideDown">
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              <div className="relative px-4 py-6 space-y-4">
                <ul className="space-y-4">{links}</ul>

                {/* Mobile Dark Mode Toggle */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-slate-200 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    {darkMode ? (
                      <>
                        <Sun size={20} className="text-yellow-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Light Mode
                        </span>
                      </>
                    ) : (
                      <>
                        <Moon size={20} className="text-gray-700" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Dark Mode
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
