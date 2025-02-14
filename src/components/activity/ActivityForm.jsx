import React, { useEffect, useState } from "react";
import useDB from "../../hooks/useDB";
import FormInput from "../smart-components/FormInput";
import useTripStore from "../../hooks/useTripStore";
import PrimaryBtn from "../btn/PrimaryBtn";
import { GoPlus } from "react-icons/go";

export default function ActivityForm() {
  const { addActivity } = useDB();
  const { trip } = useTripStore();
  const [newActivity, setNewActivity] = useState({
    place: "",
    activity: "",
    when: trip.startDate,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messsage, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSubmitted) {
      setMessage("Activity added successfully");
    }

    const timeout = setTimeout(() => {
      setMessage("");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
    setIsSubmitted(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addActivity(newActivity);
    if (response) {
      setNewActivity({
        place: "",
        activity: "",
        when: trip.startDate,
      });
      setIsSubmitted(true);
    } else {
      setError("Error adding activity");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-6 m-auto w-[90%] max-w-[400px] p-8 shadow-lg rounded-xl bg-slate-200">
      <h2 className="text-xl text-sky-800 font-semibold">Add activity!</h2>
      <FormInput
        label="Activity"
        value={newActivity.activity}
        name="activity"
        onChange={handleChange}
      />
      <FormInput label="Where" value={newActivity.place} name="place" onChange={handleChange} />
      <FormInput
        label="When"
        type="date"
        value={newActivity.when}
        name="when"
        minValue={trip.startDate}
        maxValue={trip.endDate}
        onChange={handleChange}
      />
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
      {messsage && !error && <p className="text-center text-green-600 font-semibold">{messsage}</p>}
      <div className="mt-2">
        <PrimaryBtn type="submit" btnText="Add activity" icon={<GoPlus />} />
      </div>
    </form>
  );
}
