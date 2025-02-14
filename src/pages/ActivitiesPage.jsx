import React from "react";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";

export default function ActivitiesPage() {
  const navigate = useNavigate();
  const { tripid } = useParams();

  const navigteToMyActivities = () => {
    navigate(`/trips/mytrips/${tripid}/myactivities`);
  };

  return (
    <div className="flex justify-between">
      <h1>Activities page</h1>
      <div className="w-fit p-2">
        <SecondaryBtn
          btnText="Go back"
          onClick={navigteToMyActivities}
          icon={<IoIosArrowRoundBack size={24} />}
        />
      </div>
    </div>
  );
}
