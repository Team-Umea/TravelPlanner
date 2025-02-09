import React, { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import PrimaryBtn from "../btn/PrimaryBtn";
import Input from "./Input";

export default function Trip() {
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  const [trip, setTrip] = useState({
    id: null,
    user: null,
    from: "",
    to: "",
    startDate: formatDate(new Date()),
    endDate: getTomorrowDate(), // Initialize endDate to tomorrow
  });

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  // Effect to update endDate when startDate changes
  useEffect(() => {
    const startDate = new Date(trip.startDate);
    startDate.setDate(startDate.getDate() + 1); // Set endDate to one day after startDate
    setTrip((prevTrip) => ({
      ...prevTrip,
      endDate: formatDate(startDate), // Update endDate
    }));
  }, [trip.startDate]); // Dependency on startDate

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const countryNames = data.map(country => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip data:", trip);
  };

  return (
    <form onSubmit={handleSubmit} className="trip-section flex flex-col lg:flex-row items-end justify-center space-x-1 p-4">
      <Input
        className={`w-64 placeholder:text-gray-800`}
        placeholder="Where do you want to travel?"
        type="text"
        name="to"
        value={trip.to}
        onChange={handleChange}
      />
      <Input
        label=""
        className={`w-32 placeholder:text-gray-800`}
        placeholder="From where?"
        type="text"
        name="from"
        value={trip.from}
        onChange={handleChange}
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
        min={formatDate(new Date(new Date(trip.startDate).setDate(new Date(trip.startDate).getDate() + 1)))} // Ensure min date for endDate is one day after startDate
        onChange={handleChange}
      />
      <PrimaryBtn
        btnText="Search"
        type="submit"
        icon={<IoMdCheckmark size={24} />}
        width="w-auto"
        className="h-fit"
      />
    </form>
  );
}