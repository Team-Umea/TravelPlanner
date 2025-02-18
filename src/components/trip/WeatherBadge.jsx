import React from "react";
import DataLabel from "../dumb-components/DataLabel";

export default function WeatherBadge({ weatherData }) {
  return (
    <div className="grid grid-cols-[repeat(2,1fr)] gap-2 py-2 px-4 h-fit">
      <DataLabel label="Where" data={weatherData.location} />
      <DataLabel label="Condition" data={weatherData.condition} />
      <DataLabel label="Temperature" data={`${weatherData.temp}°C`} />
      <DataLabel label="Feels like" data={`${weatherData.feelsLike}°C`} />
    </div>
  );
}
