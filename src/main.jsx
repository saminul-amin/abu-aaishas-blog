import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./layouts/Root.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Post from "./pages/Post.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import ErrorElement from "./pages/ErrorElement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contact-me",
        element: <Contact />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "all-posts",
        element: <AllPosts />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
