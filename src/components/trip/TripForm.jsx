import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import PrimaryBtn from "../btn/PrimaryBtn";
import Input from "./Input";

export default function Trip() {

  return (
    <section className="trip-section flex flex-row items-center justify-center space-x-1 p-6">
      <Input
        className={`w-96 placeholder:text-gray-800`}
        placeholder="Where do you want to travel?"
        type="text"
      />
      <Input
        type="date"
      />
      <Input
        type="date"
      />
      <PrimaryBtn
        btnText="Search"
        icon={<IoMdCheckmark size={24} />}
        width="w-auto" // Set to auto to fit the content
        className="h-fit" // Ensure the button height fits the content
      />
    </section>
  );
}