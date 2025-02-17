import React from "react";
import DataLabel from "../dumb-components/DataLabel";

export default function WeatherBadge({ weatherData }) {
  return (
    <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 py-2 px-4 h-fit rounded-2xl bg-slate-300">
      <DataLabel label="Where" data={weatherData.location} />
      <DataLabel label="Condition" data={weatherData.condition} />
      <DataLabel label="Temperature" data={`${weatherData.temp}°C`} />
      <DataLabel label="Feels like" data={`${weatherData.feelsLike}°C`} />
    </div>
  );
}
