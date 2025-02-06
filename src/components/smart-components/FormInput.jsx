import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";

export default function FormInput({
  type = "text",
  value,
  name,
  placeholder = "",
  minValue,
  maxValue,
  label,
  onChange,
  children,
}) {
  const [inputType, setInputType] = useState(type);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputType(type);
  }, [type]);

  useEffect(() => {
    const allInputs = document.querySelectorAll("input");
    if (allInputs.length > 0 && allInputs[0] === inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  const togglePasswordType = () => {
    setInputType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label className="text-sky-200 font-medium">{label}</label>
      <div className="flex w-full border-[1px] border-gray-300 rounded-md p-2">
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          name={name}
          placeholder={placeholder}
          min={minValue}
          maxLength={maxValue}
          minLength={minValue}
          required
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onChange={onChange}
          className="w-full bg-transparent border-0 outline-none"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordType}
            title={inputType === "text" ? "Hide" : "Show"}>
            {inputType === "text" ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
