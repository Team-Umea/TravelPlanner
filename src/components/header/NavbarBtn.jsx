import React from "react";

export default function NavbarBtn({
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
      className={`block py-4 px-6 bg-transparent hover:bg-white hover:bg-opacity-15 border-solid`}>
      {icon && (
        <div className="text-white mr-2 transition-transform duration-300 group-hover:translate-x-[5px]">
          {icon}
        </div>
      )}
      <p className={`text-${fontSize} whitespace-nowrap`}>{btnText}</p>
    </button>
  );
}