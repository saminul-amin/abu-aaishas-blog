import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function Root() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
