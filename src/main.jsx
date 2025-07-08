import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./layouts/Root.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "contact-me",
        element: <Contact />
      },
      {
        path: "sign-in",
        element: <Contact />
      },
      {
        path: "sign-up",
        element: <Contact />
      },
      {
        path: "all-posts",
        element: <AllPosts />
      },
      {
        path: "post/:id",
        element: <Post />
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
