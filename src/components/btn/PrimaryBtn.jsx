import React from "react";

export default function PrimaryBtn({
  type = "button",
  btnText,
  fontSize = "base",
  width = "w-full",
  onClick,
  icon,
}) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseLeave={(e) => e.target.blur()}
      className={`flex justify-center items-center ${width} h-fit text-white font-semibold py-[10px] px-[25px] rounded-full transition-opacity duration-500 cursor-pointer group bg-green-600 hover:opacity-60`}>
      {icon && (
        <div className="text-white mr-2 transition-transform duration-300 group-hover:translate-x-[5px]">
          {icon}
        </div>
      )}
      <p className={`text-${fontSize} whitespace-nowrap`}>{btnText}</p>
    </button>
  );
}
