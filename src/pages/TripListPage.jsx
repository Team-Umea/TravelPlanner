import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import useDB from "../hooks/useDB";

export default function TripListPage() {
  const [trips, setTrips] = useState([]);
  const { addTrip, getTrips, deleteAllTrips } = useDB();

  useEffect(() => {
    (async () => {
      // await deleteAllTrips();
      await addTrip({ to: "hej", from: "då", startDate: "2025-03-23", endDate: "2025-04-23" });

      // const response = await getTrips();
      // response && setTrips(response);
    })();
  }, []);

  return (
    <div>
      Trips list page
      <ul>
        {trips.map((trip) => {
          return (
            <li key={trip.id}>
              <p>{trip.from}</p>
              <p>{trip.activities.length}</p>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
