import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./firebase/auth/auth.provider";
import "./index.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Root from "./pages/root";
import { ProtectedRoute } from "./ProtectedRoute";

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
                <div>Dashboard</div>
              </ProtectedRoute>
            ),
            // protected route
          },
          {
            path: "login",
            element: <Login />,
            // unprotected route
          },
          {
            path: "register",
            element: <Register />,
            // unprotected route
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
  </React.StrictMode>
);
