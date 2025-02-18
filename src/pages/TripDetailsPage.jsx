import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { HashLoader } from "react-spinners";
import useDB from "../hooks/useDB";
import useTripStore from "../hooks/useTripStore";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import useImageApi from "../hooks/useImageApi";
import useWeatherApi from "../hooks/useWeatherApi";
import WeatherBadge from "../components/trip/WeatherBadge";
import OutlineBtn from "../components/btn/OutlineBtn";

export default function TripDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripid } = useParams();
  const { updateTrip } = useTripStore();
  const { getTrip } = useDB();
  const { fetchImages } = useImageApi();
  const { fetchWeatherData } = useWeatherApi();
  const [currentTrip, setCurrentTrip] = useState();
  const [isLoading, setIsLoading] = useState();
  const [images, setImages] = useState([]);
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const tripResponse = await getTrip(tripid);
      if (tripResponse) {
        setCurrentTrip(tripResponse);
        updateTrip(tripResponse);
        const imagesResponse = await fetchImages(tripResponse.to);

        if (imagesResponse) {
          const photos = imagesResponse.photos.map((image) => image.src.portrait);
          setImages(photos);
        }

        const weatherResponse = await fetchWeatherData(tripResponse.to);
        setWeatherData({
          location: weatherResponse.location.name,
          condition: weatherResponse.current.condition.text,
          temp: weatherResponse.current.temp_c,
          feelsLike: weatherResponse.current.feelslike_c,
        });
      }
      setIsLoading(false);
    })();
  }, []);

  const navigateToTripsListPage = () => {
    navigate("/trips/mytrips");
  };

  const navigateToActivityListPage = () => {
    navigate(`/trips/mytrips/${tripid}/myactivities`);
  };

  const isMyActivityListPage = location.pathname.includes("myactivities");
  const isActivityPage = location.pathname.includes("activities");

  if (isLoading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  if (isMyActivityListPage || isActivityPage) {
    return <Outlet />;
  }

  return (
    <>
      {currentTrip && (
        <div>
          <div className="flex justify-between">
            <div>
              <p>Trips details page</p>
              <div className="p-2 w-fit">
                <OutlineBtn
                  btnText="Go back"
                  onClick={navigateToTripsListPage}
                  icon={<IoIosArrowRoundBack size={24} color="black" />}
                />
              </div>
            </div>
            <WeatherBadge weatherData={weatherData} />
          </div>
          <div>
            <p>To: {currentTrip.to}</p>
            <p>From: {currentTrip.from}</p>
            <p>Start date: {currentTrip.startDate}</p>
            <p>End date: {currentTrip.endDate}</p>
            <p>Number of activities: {currentTrip.activities.length}</p>
            <div className="p-2 w-fit">
              <SecondaryBtn
                btnText="See activities"
                onClick={navigateToActivityListPage}
                icon={<IoIosArrowRoundForward size={24} />}
              />
            </div>
          </div>
          <ul className="grid grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(4,1fr)] xl:grid-cols-[repeat(5,1fr)] gap-2">
            {images.map((image, index) => {
              return (
                <li key={index}>
                  <img src={image} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
