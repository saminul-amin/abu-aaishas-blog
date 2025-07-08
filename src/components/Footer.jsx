import { Link } from "react-router-dom";
import { Heart, ArrowUp, User, BookOpen, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <footer className="relative bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 mt-20">
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

        {/* Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          {/* Top Section */}
          <div className="text-center mb-12 animate-fadeInUp">
            {/* Logo/Brand */}
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-300 to-slate-300 rounded-2xl blur-xl opacity-20 animate-pulse-custom"></div>
              <div className="relative flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full flex items-center justify-center animate-float">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Abu Aaisha's Blog
                </h3>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Sharing reflections, reminders, and practical insights rooted in
              faith and simplicity.
            </p>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link
                to="/about"
                className="group relative px-6 py-3 font-medium transition-all duration-300 hover:text-gray-800 dark:hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 dark:from-gray-700 dark:to-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <User className="w-4 h-4" />
                  About
                </div>
              </Link>

              <Link
                to="/blog"
                className="group relative px-6 py-3 font-medium transition-all duration-300 hover:text-gray-800 dark:hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 dark:from-gray-700 dark:to-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Blog
                </div>
              </Link>

              <Link
                to="/categories"
                className="group relative px-6 py-3 font-medium transition-all duration-300 hover:text-gray-800 dark:hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 dark:from-gray-700 dark:to-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Categories
                </div>
              </Link>

              <Link
                to="/contact"
                className="group relative px-6 py-3 font-medium transition-all duration-300 hover:text-gray-800 dark:hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-slate-200 dark:from-gray-700 dark:to-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </div>
              </Link>
            </div>

            {/* Scroll to Top Button */}
            <div className="mb-8">
              <button
                onClick={scrollToTop}
                className="group relative px-6 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-slate-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  Back to Top
                </div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-4 bg-gradient-to-r from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Heart className="w-6 h-6 text-gray-400 dark:text-gray-600" />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <span>&copy; {new Date().getFullYear()} Abu Aaisha's Blog</span>
                <span>•</span>
                <span>All rights reserved</span>
              </p>
              <p className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse-custom" />
                <span>and dedication</span>
              </p>
            </div>

            {/* Bengla name */}
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-[SolaimanLipi]">
              আমার নাম সামিন
            </p>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-slate-300 to-stone-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
      </footer>
    </>
  );
}
