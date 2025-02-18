import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import useDB from "../hooks/useDB";
import { HashLoader } from "react-spinners";
import DangerBtn from "../components/btn/DangerBtn";
import { FaRegTrashCan } from "react-icons/fa6";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import PrimaryBtn from "../components/btn/PrimaryBtn";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import OutlineBtn from "../components/btn/OutlineBtn";

export default function ActivityListPage() {
  const navigate = useNavigate();
  const { tripid, activityid } = useParams();
  const [activities, setActivities] = useState([]);
  const { getActivities, deleteAllActivities } = useDB();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getActivities();
      response && setActivities(response);
      setIsLoading(false);
    })();
  }, []);

  const handleDeleteAllActivities = async () => {
    const response = await deleteAllActivities();
    if (response) {
      setActivities([]);
    }
  };

  const navigateToActivityDetails = (id) => {
    navigate(`/trips/mytrips/${tripid}/myactivities/${id}`);
  };

  const navigateToActivities = () => {
    navigate(`/trips/mytrips/${tripid}/activities`);
  };

  const navigateToTripDetails = () => {
    navigate(`/trips/mytrips/${tripid}`);
  };

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (activityid) {
    return <Outlet />;
  }

  return (
    <div className="grid gird-rows-[auto_1fr]">
      <div className="flex justify-between">
        <h1>Activity list page</h1>
        <div className="flex">
          <div className="p-2 w-fit">
            <OutlineBtn
              btnText="Go back"
              onClick={navigateToTripDetails}
              icon={<IoIosArrowRoundBack size={24} color="black" />}
            />
          </div>
          <div className="p-2 w-fit">
            <SecondaryBtn
              btnText="Add activity"
              onClick={navigateToActivities}
              icon={<IoIosArrowRoundForward size={24} />}
            />
          </div>
          <div className="w-fit p-2">
            <DangerBtn
              btnText="Delete All activities"
              onClick={handleDeleteAllActivities}
              icon={<FaRegTrashCan size={24} />}
            />
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-y-4 my-[100px] p-4 w-full overflow-y-auto">
        {activities.map((activity) => {
          return (
            <li key={activity.id} className="flex justify-between gap-x-10">
              <p>Activity {activity.activity}</p>
              <p>Place {activity.place}</p>
              <p>When {activity.when}</p>
              <div className="w-fit">
                <PrimaryBtn
                  btnText="Manage activity"
                  onClick={() => navigateToActivityDetails(activity.id)}
                  icon={<IoSettingsOutline />}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
