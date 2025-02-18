import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useDB from "../hooks/useDB";
import { HashLoader } from "react-spinners";
import useTripStore from "../hooks/useTripStore";
import { IoIosArrowRoundBack } from "react-icons/io";
import OutlineBtn from "../components/btn/OutlineBtn";
import DangerBtn from "../components/btn/DangerBtn";
import { FaRegTrashCan } from "react-icons/fa6";
import UpdateForm from "../components/smart-components/UpdateForm";

export default function ActivityDetailsPage() {
  const navigate = useNavigate();
  const { tripid, activityid } = useParams();
  const { updateActivity } = useTripStore();
  const { getActivity, deleteActivity,editActivity,getTrip } = useDB();
  const [currentActivity, setCurrentActivity] = useState();
  const [currentTrip, setCurrentTrip] = useState();
  const [isLoading, setIsLoading] = useState();
  const [activityDataUpdated, setActivityDataUpdated] = useState(true);

  useEffect(() => {
    (async () => {
      if(activityDataUpdated){
        setIsLoading(true);
        const activityResponse = await getActivity(tripid, activityid);
        if (activityResponse) {
          setCurrentActivity(activityResponse);
          updateActivity(activityResponse);
        }
        const tripResponse = await getTrip(tripid);
        if(tripResponse){
          setCurrentTrip(tripResponse);
        }
        setIsLoading(false);
      }
    })();
  }, [activityDataUpdated]);

  const navigateToActivityListPage = () => {
    navigate(`/trips/mytrips/${tripid}/myactivities`);
  };
  const handleDeleteActivity = async () =>{
    const response = await deleteActivity();
    if(response){
      navigate(`/trips/mytrips/${tripid}/myactivities`);
    }
  }
  const handleActivityDataChange = (e) => {
    const { name, value } = e.target;
    setCurrentActivity((prev) => ({ ...prev, [name]: value }));
    if(activityDataUpdated){
      setActivityDataUpdated(false)
    }
  };

  const handleUpdateActivityData = async () => {
    await editActivity({
      activity: currentActivity.activity,
      place: currentActivity.place,
      when: currentActivity.when,
    });
    setActivityDataUpdated(true);
  };
  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (!currentActivity || !currentTrip) {
    return <h1 className="text-2xl text-red-600 text-center font-semibold">Activity not found</h1>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-1 p-4">
          <h1 className="text-2xl font-semibold ">
            {currentActivity.activity}
          </h1>
          <h2>
            {currentActivity.place}
          </h2>
          <h3>
            {currentActivity.when}
          </h3>
        </div>
        <div className="flex flex-col w-fit p-2 gap-2 ">
          <OutlineBtn
            btnText="Go back"
            onClick={navigateToActivityListPage}
            icon={<IoIosArrowRoundBack size={24} color="black" />}
          />
          <DangerBtn 
          btnText="Delete Activity"
          onClick={handleDeleteActivity}
          icon={<FaRegTrashCan size={24} />}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-10 m-auto mb-[100px] w-[90%] max-w-[400px] mt-24">
                  <UpdateForm
                    label="Update Activity"
                    placeholder={currentActivity.activity}
                    name="activity"
                    onChange={handleActivityDataChange}
                    onSubmit={handleUpdateActivityData}
                  />
                  <UpdateForm
                    label="Update Place"
                    placeholder={currentActivity.place}
                    name="place"
                    onChange={handleActivityDataChange}
                    onSubmit={handleUpdateActivityData}
                  />
                  <UpdateForm
                    label="Update When"
                    type="date"
                    placeholder={currentActivity.when}
                    name="when"
                    value={currentActivity.when}
                    min={currentTrip.startDate}
                    max={currentTrip.endDate}
                    onChange={handleActivityDataChange}
                    onSubmit={handleUpdateActivityData}
                  />
                  
                </div>
    </div>
  );
}
