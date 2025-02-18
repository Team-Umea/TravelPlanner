import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import OutlineSmallBtn from "../btn/OutlineSmallBtn";

export default function UpdateForm({
  label,
  placeholder,
  type = "text",
  name,
  value,
  min,
  max,
  onChange,
  onSubmit,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-x-10 items-end w-full">
      <div className="flex flex-col gap-y-2 w-full">
        <label>{label}</label>
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          min={min}
          minLength={min}
          max={max}
          maxLength={max}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          required
          onChange={onChange}
          className="bg-transparent border-0 outline-none border-b-[1px] border-gray-600 text-black placeholder-gray-500"
        />
      </div>
      <div className="w-fit">
        <OutlineSmallBtn
          btnText="Save"
          type="submit"
          icon={<IoMdCheckmark size={20} color="black" />}
        />
      </div>
    </form>
  );
}
