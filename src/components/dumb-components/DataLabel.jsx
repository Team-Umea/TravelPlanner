import React from "react";

export default function DataLabel({ data, label }) {
  return (
    <div className="flex gap-x-2 h-fit">
      <p className="text-gray-500">{label}</p>
      <p>{data}</p>
    </div>
  );
}
