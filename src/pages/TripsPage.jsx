import Trip from "../components/trip/TripForm";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router";
import OutlineBtn from "../components/btn/OutlineBtn";

export default function TripsPage() {
  const navigate = useNavigate();

  const navigateToMyTrips = () => {
    navigate("mytrips");
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="w-fit p-2">
          <OutlineBtn
            btnText="See my trips"
            onClick={navigateToMyTrips}
            icon={<IoIosArrowRoundForward size={24} color="black" />}
          />
        </div>
      </div>
      <Trip />
    </>
  );
}
