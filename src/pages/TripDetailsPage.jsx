import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { HashLoader } from "react-spinners";
import useDB from "../hooks/useDB";

export default function TripDetailsPage() {
  const { tripid } = useParams();
  const location = useLocation();
  const { getTrip, editTrip, deleteTrip } = useDB();
  const [currentTrip, setCurrentTrip] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getTrip(tripid);
      if (response) {
        setCurrentTrip(response);
        //also update global state trip with the current trip on mount
      }
      setIsLoading(false);
    })();
  }, []);

  const isMyActivityListPage = location.pathname.includes("myactivities");

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (isMyActivityListPage) {
    return <Outlet />;
  }

  return (
    <>
      {currentTrip && (
        <div>
          <p>Trips details page</p>
          <div>
            <p>To: {currentTrip.to}</p>
            <p>From: {currentTrip.from}</p>
            <p>Start date: {currentTrip.startDate}</p>
            <p>End date: {currentTrip.endDate}</p>
            <p>Number of activities: {currentTrip.activities.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
