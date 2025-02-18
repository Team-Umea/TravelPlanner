import React from "react";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import ActivityForm from "../components/activity/ActivityForm";
import OutlineBtn from "../components/btn/OutlineBtn";

export default function ActivitiesPage() {
  const navigate = useNavigate();
  const { tripid } = useParams();

  const navigteToMyActivities = () => {
    navigate(`/trips/mytrips/${tripid}/myactivities`);
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="w-fit p-2">
          <OutlineBtn
            btnText="Go back"
            onClick={navigteToMyActivities}
            icon={<IoIosArrowRoundBack size={24} color="black" />}
          />
        </div>
      </div>
      <ActivityForm />
    </>
  );
}
