import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useDB from "../hooks/useDB";
import { HashLoader } from "react-spinners";
import useTripStore from "../hooks/useTripStore";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ActivityDetailsPage() {
  const navigate = useNavigate();
  const { tripid, activityid } = useParams();
  const { updateActivity } = useTripStore();
  const { getActivity, editActivity, deleteActivity } = useDB();
  const [currentActivity, setCurrentActivity] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getActivity(tripid, activityid);
      if (response) {
        setCurrentActivity(response);
        updateActivity(response);
        //also update global state activity with the current activity on mount
      }
      setIsLoading(false);
    })();
  }, []);

  const navigateToActivityListPage = () => {
    navigate(`/trips/mytrips/${tripid}/myactivities`);
  };

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (!currentActivity) {
    return <h1 className="text-2xl text-red-600 text-center font-semibold">Activity not found</h1>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1>Activity details page</h1>
        <div className="w-fit p-2">
          <SecondaryBtn
            btnText="Go back"
            onClick={navigateToActivityListPage}
            icon={<IoIosArrowRoundBack size={24} />}
          />
        </div>
      </div>
      <p>place: {currentActivity.place}</p>
      <p>activity: {currentActivity.activity}</p>
      <p>when: {currentActivity.when}</p>
    </div>
  );
}
