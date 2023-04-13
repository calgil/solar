import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./firebase/auth/auth.provider";
import "./styles/globals.scss";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Root from "./pages/root";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { UnProtectedRoute } from "./pages/UnProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error!!</div>,
    children: [
      {
        errorElement: <div>Error!!</div>,
        children: [
          {
            path: "/",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "login",
            element: (
              <UnProtectedRoute>
                <Login />
              </UnProtectedRoute>
            ),
          },
          {
            path: "register",
            element: (
              <UnProtectedRoute>
                <Register />
              </UnProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);
