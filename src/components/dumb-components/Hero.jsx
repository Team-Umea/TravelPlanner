import { useNavigate } from "react-router";
import ocean from "../../assets/ocean.mp4";
import TextTypingAnimation from "../../layouts/animation/TextTypingAnimation";
import OutlineWhiteBtn from "../btn/OutlineWhiteBtn";
import { BsGlobeAmericas } from "react-icons/bs";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen mt-[-90px]">
      <div className="absolute top-0 bottom-0 left-0 right-0 h-screen">
        <video src={ocean} autoPlay loop muted className="w-full h-full object-cover" />
      </div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-black bg-opacity-50 h-full flex flex-col items-center justify-center">
        <TextTypingAnimation text="Explore the world, one trip at a time." />
        <div className="w-fit mt-10">
          <OutlineWhiteBtn
            btnText="Plan your trip"
            icon={<BsGlobeAmericas size={24} />}
            onClick={() => navigate("/trips")}
          />
        </div>
      </div>
    </div>
  );
}
