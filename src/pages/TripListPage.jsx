import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import useDB from "../hooks/useDB";
import { HashLoader } from "react-spinners";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import DangerBtn from "../components/btn/DangerBtn";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import OutlineBtn from "../components/btn/OutlineBtn";
import TripCard from "../components/trip/TripCard";

export default function TripListPage() {
  const navigate = useNavigate();
  const { tripid } = useParams();
  const [trips, setTrips] = useState([]);
  const { addTrip, getTrips, deleteAllTrips } = useDB();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getTrips();
      response && setTrips(response);
      setIsLoading(false);
    })();
  }, []);

  const handleDeleteAllTrips = async () => {
    const response = await deleteAllTrips();
    if (response) {
      setTrips([]);
    }
  };

  const navigateToTrips = () => {
    navigate("/trips");
  };

  const navigateToTripDetails = (id) => {
    navigate(`/trips/mytrips/${id}`);
  };

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (tripid) {
    return <Outlet />;
  }

  return (
    <div className="grid gird-rows-[auto_1fr]">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold p-4">Your trips</h1>
        <div className="flex flex-col md:flex-row items-end md:items-center gap-4 p-2">
          <OutlineBtn
            btnText="Add trip"
            onClick={navigateToTrips}
            icon={<IoIosArrowRoundForward size={24} color="black" />}
          />
          <DangerBtn
            btnText="Delete All Trips"
            onClick={handleDeleteAllTrips}
            icon={<FaRegTrashCan size={24} />}
          />
        </div>
      </div>
      <ul className="flex flex-col gap-y-20 my-[100px] p-4 w-full overflow-y-auto">
        {trips.map((trip) => {
          return (
            <li key={trip.id}>
              <TripCard trip={trip} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
