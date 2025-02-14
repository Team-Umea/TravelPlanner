import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useDB from "../hooks/useDB";
import { HashLoader } from "react-spinners";

export default function ActivityDetailsPage() {
  const { tripid, activityid } = useParams();
  const { getActivity, editActivity, deleteActivity } = useDB();
  const [currentActivity, setCurrentActivity] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getActivity(tripid, activityid);
      if (response) {
        setCurrentActivity(response);
        //also update global state activity with the current activity on mount
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (!currentActivity) {
    return <h1 className="text-2xl text-red-600 text-center font-semibold">Activity not found</h1>;
  }

  return (
    <div>
      <p className="mb-[100px]">Activity details page</p>
      <p>place: {currentActivity.place}</p>
      <p>activity: {currentActivity.activity}</p>
      <p>when: {currentActivity.when}</p>
    </div>
  );
}
