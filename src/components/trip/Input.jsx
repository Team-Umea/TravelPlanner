// Input.jsx
import React from 'react';

function Input({ placeholder, value, onChange, type, className }) {
  const baseInputClass = "p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 h-10 w-64"; // Set a fixed width

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`${baseInputClass} ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
      />
    </>
  );
}

export default Input;