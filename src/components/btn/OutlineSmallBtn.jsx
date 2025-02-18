import React from "react";

export default function OutlineSmallBtn({ type = "button", btnText, onClick, icon }) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseLeave={(e) => e.target.blur()}
      className="flex justify-center items-center w-full h-fit text-black font-medium py-[5px] px-[15px] rounded-full transition-opacity duration-500 cursor-pointer group border-[1px] border-black hover:opacity-60">
      {icon && (
        <div className="text-white mr-2 transition-transform duration-300 group-hover:translate-x-[5px]">
          {icon}
        </div>
      )}
      <p className="text-sm whitespace-nowrap">{btnText}</p>
    </button>
  );
}
