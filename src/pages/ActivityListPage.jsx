import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import useDB from "../hooks/useDB";
import { HashLoader } from "react-spinners";
import DangerBtn from "../components/btn/DangerBtn";
import { FaRegTrashCan } from "react-icons/fa6";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import { IoSettingsOutline } from "react-icons/io5";

export default function ActivityListPage() {
  const navigate = useNavigate();
  const { tripid, activityid } = useParams();
  const [activities, setActivities] = useState([]);
  const { getActivities, deleteAllActivities, addActivity } = useDB();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // await addActivity({ place: "då", activity: "xxx", when: "yyy" });
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

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (activityid) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between">
        <h1>Activity list page</h1>
        <div className="w-fit p-2">
          <DangerBtn
            btnText="Delete All activities"
            onClick={handleDeleteAllActivities}
            icon={<FaRegTrashCan size={24} />}
          />
        </div>
      </div>
      <ul className="flex flex-col gap-y-4 my-[100px] p-4 w-full">
        {activities.map((activity) => {
          return (
            <li key={activity.id} className="flex justify-between gap-x-10">
              <p>Activity {activity.activity}</p>
              <p>Place {activity.place}</p>
              <p>When {activity.when}</p>
              <div className="w-fit">
                <SecondaryBtn
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
