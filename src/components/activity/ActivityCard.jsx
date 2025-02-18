import DataLabel from "../dumb-components/DataLabel";
import SecondaryBtn from "../btn/SecondaryBtn";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";

export default function ActivityCard({activity}) {
    const navigate = useNavigate();
    const {tripid} = useParams();
    return (
        <div className="flex justify-between w-full bg-slate-300 rounded-lg p-4 items-center">
          <div className="flex flex-col gap-y-2">
            <DataLabel label="Activity :" data={activity.activity} />
            <DataLabel label="Place :" data={activity.place} />
            <DataLabel label="When :" data={activity.when} />

          </div>
          <div className="w-fit">
            <SecondaryBtn
              btnText="Manage Activity"
              onClick={() => navigate(`${activity.id}`)}
              icon={<IoSettingsOutline />}
            />
          </div>
        </div>
      );
}
