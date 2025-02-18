import React from "react";

export default function NavbarBtn({ type = "button", btnText, fontSize = "base", onClick, icon }) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseLeave={(e) => e.target.blur()}
      className={`block py-4 px-6 bg-transparent hover:bg-white hover:bg-opacity-15 transition-all duration-300 ease border-solid drop-shadow-[0_0_1px_rgba(0,0,0,1)] tracking-wider`}>
      {icon && (
        <div className="text-white mr-2 transition-transform duration-300 group-hover:translate-x-[5px]">
          {icon}
        </div>
      )}
      <p className={`text-${fontSize} whitespace-nowrap`}>{btnText}</p>
    </button>
  );
}
