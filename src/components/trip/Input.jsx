// Input.jsx
import React from 'react';

function Input({ label, name, min, placeholder, value, onChange, type, className }) {
  const baseInputClass = "p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 h-10 w-64"; // Set a fixed width

  return (
    <div className="flex flex-col gap-y-2 p-1">

      {label && <label className="input-label">{label}</label>}


      <input
        name={name}
        type={type}
        min={min}
        placeholder={placeholder}
        className={`${baseInputClass} ${className}`}
        value={value}
        onChange={onChange} 
      />
    </div>
  );
}

export default Input;