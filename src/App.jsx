import React from "react";
import { RouterProvider } from "react-router";
import router from "./router/Router";
import { setUsername } from "./store/authSlice";

export default function App() {
  return <RouterProvider router={router} />;
}
