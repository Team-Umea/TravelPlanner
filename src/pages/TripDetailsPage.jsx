import React from "react";
import { Outlet } from "react-router";

export default function TripDetailsPage() {
  return (
    <div>
      Trips details page
      <Outlet />
    </div>
  );
}
