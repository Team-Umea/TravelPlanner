import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import useDB from "../hooks/useDB";

export default function TripDetailsPage() {
  const { tripid } = useParams();
  const { getTrip, editTrip, deleteTrip } = useDB();

  useEffect(() => {
    (async () => {
      // await deleteTrip();
      // const response = await editTrip({ from: "test11" });
      // if (response) {
      //   console.log("Edited successfully");
      // } else {
      //   console.log("Edit error");
      // }
      const response = await getTrip(tripid);
      console.log("trip: ", response);
    })();
  }, []);

  return (
    <div>
      Trips details page
      <Outlet />
    </div>
  );
}
