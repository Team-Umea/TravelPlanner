import React, { useState } from "react";

export default function AutocompleteInput({
  name,
  value,
  placeholder = "",
  onChange,
  options,
  className
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(e);

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredOptions);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { name, value: suggestion } });
    setSuggestions([]);
  };

  const showSuggestions = value.length > 0 && suggestions.length > 0;
  const baseInputClass = "p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 h-10"; // Set a fixed width

  return (
    <div className="flex flex-col gap-y-2 p-1 relative">
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`${baseInputClass} ${className}`}
        autoCorrect="off"
        autoComplete="off"
        required
      />
      {showSuggestions && (
        <ul className="absolute top-12 z-10 w-full max-h-[300px] bg-gray-300 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer hover:bg-gray-200 p-2">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}