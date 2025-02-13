import React, { useEffect } from "react";
import { useParams } from "react-router";
import useDB from "../hooks/useDB";

export default function ActivityDetailsPage() {
  const { tripid, activityid } = useParams();
  const { getActivity, editActivity, deleteActivity } = useDB();

  useEffect(() => {
    (async () => {
      // await deleteActivity();

      await editActivity({ place: "my place this is!!" });

      // const response = await getActivity(tripid, activityid);
      // console.log("activty: ", response);
    })();
  }, []);
  return <div>Activity details page</div>;
}
