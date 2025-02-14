import Trip from "../components/trip/TripForm";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router";

export default function TripsPage() {
  const navigate = useNavigate();

  const navigateToMyTrips = () => {
    navigate("mytrips");
  };

  return (
    <>
      <div className="flex justify-between">
        <h1>Trips page</h1>
        <div className="w-fit p-2">
          <SecondaryBtn
            btnText="See my trips"
            onClick={navigateToMyTrips}
            icon={<IoIosArrowRoundForward size={24} />}
          />
        </div>
      </div>
      <Trip />
    </>
  );
}
