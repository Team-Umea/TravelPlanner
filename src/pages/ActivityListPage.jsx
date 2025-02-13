import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import useDB from "../hooks/useDB";

export default function ActivityListPage() {
  const [activities, setActivities] = useState([]);
  const { addActivity, getActivities, deleteAllActivities } = useDB();

  useEffect(() => {
    (async () => {
      await addActivity({ place: "this is a place", activity: "my act", when: "2025-02-12" });
      // await deleteAllActivities();
      // const response = await getActivities();
      // response && setActivities(response);
    })();
  }, []);

  return (
    <div>
      Activity list page
      <ul>
        {activities.map((activity) => {
          return (
            <li key={activity.id}>
              <p>{activity.activity}</p>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
