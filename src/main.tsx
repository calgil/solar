import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error!!</div>,
    children: [
      {
        errorElement: <div>Error!!</div>,
        children: [
          {
            path: "/",
            // element dashboard
            // protected route
          },
          {
            path: "login",
            // element login
            // unprotected route
          },
          {
            path: "register",
            // element register
            // unprotected route
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
