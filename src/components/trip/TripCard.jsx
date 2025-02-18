import React from "react";
import DataLabel from "../dumb-components/DataLabel";
import SecondaryBtn from "../btn/SecondaryBtn";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

function TripCard({ trip }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-y-2">
        <DataLabel label="To" data={trip.to} />
        <DataLabel label="From" data={trip.from} />
        <DataLabel label="Start Date" data={trip.startDate} />
        <DataLabel label="End Date" data={trip.endDate} />
      </div>
      <div className="w-fit">
        <SecondaryBtn
          btnText="Manage trip"
          onClick={() => navigate(`${trip.id}`)}
          icon={<IoSettingsOutline />}
        />
      </div>
    </div>
  );
}

export default React.memo(TripCard);
