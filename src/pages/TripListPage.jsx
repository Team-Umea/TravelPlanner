import React from "react";
import { Outlet } from "react-router";

export default function TripListPage() {
  return (
    <div>
      Trips list page
      <Outlet />
    </div>
  );
}
