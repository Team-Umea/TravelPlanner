import React from "react";
import { Outlet } from "react-router";

export default function ActivityListPage() {
  return (
    <div>
      Activity list page
      <Outlet />
    </div>
  );
}
