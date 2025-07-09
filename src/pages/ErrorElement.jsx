import { useRouteError, Link } from "react-router-dom";
import { Home, RefreshCw, AlertTriangle, ArrowLeft } from "lucide-react";

export default function ErrorElement() {
  const error = useRouteError();

  // Determine error type and message
  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        status: "404",
      };
    }

    if (error?.status >= 500) {
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        status: error.status.toString(),
      };
    }

    return {
      title: "Something Went Wrong",
      message: error?.message || "An unexpected error occurred.",
      status: "Error",
    };
  };

  const { title, message, status } = getErrorInfo();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-pulse-custom {
          animation: pulse 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

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

      <div className="relative max-w-2xl mx-auto text-center animate-fadeInUp">
        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-full blur-xl opacity-20 animate-pulse-custom" />
          <div className="relative w-24 h-24 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto animate-float">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Error Status */}
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-300 to-slate-300 rounded-xl blur opacity-20" />
            <span className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {status}
            </span>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {title}
        </h1>

        {/* Error Message */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto">
          {message}
        </p>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === "development" && error?.stack && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <details className="text-left">
              <summary className="cursor-pointer font-medium text-red-600 dark:text-red-400 mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-sm text-red-700 dark:text-red-300 overflow-x-auto">
                {error.stack}
              </pre>
            </details>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>

          <button
            onClick={handleRefresh}
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-slate-100/50 rounded-2xl blur-2xl"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
              Need Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you continue to experience issues, you can explore other
              sections of the blog or contact me directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/all-posts"
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Browse All Posts
              </Link>
              <Link
                to="/contact-me"
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
