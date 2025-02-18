import React, { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import PrimaryBtn from "../btn/PrimaryBtn";
import Input from "./Input";
import InputAutoSuggest from "./InputAutoSuggest";
import useDB from "../../hooks/useDB";
import { useNavigate } from "react-router";
import { HashLoader } from "react-spinners";
import useImageApi from "../../hooks/useImageApi";

export default function Trip() {
  const { addTrip } = useDB();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const { fetchImage } = useImageApi();

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  const [trip, setTrip] = useState({
    from: "",
    to: "",
    startDate: formatDate(new Date()),
    endDate: getTomorrowDate(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleCountrySelect = (country) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      to: country, // Update the 'to' field with the clicked country
    }));
  };

  // Effect to update endDate when startDate changes
  useEffect(() => {
    const startDate = new Date(trip.startDate);
    startDate.setDate(startDate.getDate() + 2); // Set endDate to one day after startDate
    setTrip((prevTrip) => ({
      ...prevTrip,
      endDate: formatDate(startDate), // Update endDate
    }));
  }, [trip.startDate]); // Dependency on startDate

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const countryNames = ["Germany", "France", "Japan", "China", "Sweden", "United States", "India", "Thailand"];
  
        // Fetch images for all countries in parallel
        const responses = await Promise.all(countryNames.map(async (country) => {
          const response = await fetchImage(country);
          return {
            country,
            images: response.photos.map((img) => img.src.portrait) // Extract images
          };
        }));
  
        setImages(responses);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    })();
  }, []);
  
  

  if (loading) {
    return <HashLoader size={50} color="black" className="m-auto" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toValid = countries.includes(trip.to);
    const fromValid = countries.includes(trip.from);
    if(toValid && fromValid && trip.to != trip.from){
      await addTrip(trip);
      navigate("mytrips");
    } else {
      if(!toValid && !fromValid){
        setError("Invalid country origin and destination")
      } else if (!toValid){
        setError("Invalid country origin")
      } else if (!fromValid){
        setError("Invalid country destination")
      } else if (toValid && fromValid && trip.to == trip.from){
        setError("Origin country and destination country can't be the same")
      }
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="trip-section flex flex-col lg:flex-row gap-y-3 items-center lg:items-end justify-center space-x-1 p-4">

      <InputAutoSuggest
        type="text"
        className={`w-64 placeholder:text-gray-800`}
        placeholder="Where are you travelling to?"
        onChange={handleChange}
        value={trip.to}
        name="to"
        options={countries}
      />
      <InputAutoSuggest
        className={`w-64 lg:w-32 placeholder:text-gray-800`}
        placeholder="From where?"
        type="text"
        name="from"
        value={trip.from}
        onChange={handleChange}
        options={countries}
      />
      <Input
        label="Begin travels at"
        type="date"
        name="startDate"
        min={trip.startDate}
        value={trip.startDate}
        onChange={handleChange}
      />
      <Input
        label="Return home by"
        name="endDate"
        type="date"
        value={trip.endDate}
        min={formatDate(
          new Date(new Date(trip.startDate).setDate(new Date(trip.startDate).getDate() + 1))
        )}
        onChange={handleChange}
      />
      <PrimaryBtn
        btnText="Add trip"
        type="submit"
        icon={<IoMdCheckmark size={24} />}
        width="w-auto"
        className="h-fit"
      />
    </form>
    {error&&<div class="error">Error: {error}</div>}

    <div className="w-full max-w-[1368px] mt-12 mx-auto">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {images.map((item, index) => (
          <li key={index} className="flex flex-col items-center">
            <button 
              onClick={() => handleCountrySelect(item.country)} 
              className="text-lg font-semibold mb-2 hover:underline cursor-pointer"
            >
              {item.country}
            </button>

            {item.images.map((image, imgIndex) => (
              <img 
                key={imgIndex} 
                src={image} 
                alt={item.country} 
                className="rounded-lg shadow-md w-full object-cover cursor-pointer hover:outline hover:outline-3 hover:outline-blue-500"
                onClick={() => handleCountrySelect(item.country)}
              />
            ))}
          </li>
        ))}
      </ul>
    </div>





    </>
  );
}
