import React from "react";
import ProtectedRoute from "../components/dumb-components/ProtectedRoute";
import { Outlet } from "react-router";

export default function TripLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}
