import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { HashLoader } from "react-spinners";
import useDB from "../hooks/useDB";
import useTripStore from "../hooks/useTripStore";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function TripDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripid } = useParams();
  const { updateTrip } = useTripStore();
  const { getTrip, editTrip, deleteTrip } = useDB();
  const [currentTrip, setCurrentTrip] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getTrip(tripid);
      if (response) {
        setCurrentTrip(response);
        updateTrip(response);
        //also update global state trip with the current trip on mount
      }
      setIsLoading(false);
    })();
  }, []);

  const navigateToActivityListPage = () => {
    navigate(`/trips/mytrips/${tripid}/myactivities`);
  };

  const isMyActivityListPage = location.pathname.includes("myactivities");
  const isActivityPage = location.pathname.includes("activities");

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (isMyActivityListPage || isActivityPage) {
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
            <div className="p-2 w-fit">
              <SecondaryBtn
                btnText="See activities"
                onClick={navigateToActivityListPage}
                icon={<IoIosArrowRoundForward size={24} />}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
