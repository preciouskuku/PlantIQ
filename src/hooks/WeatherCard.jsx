// src/components/WeatherCard.jsx
import { useEffect, useState } from "react";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      const latitude = -17.8292; // Harare latitude
      const longitude = 31.0522; // Harare longitude

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relative_humidity_2m,is_day&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=Africa/Harare`
      );

      const data = await res.json();
      setWeather(data);
    }

    fetchWeather();
  }, []);

  if (!weather) return <div className="text-center">Loading weather...</div>;

  const current = weather.current;
  const daily = weather.daily;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-gray-800 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Harare</h2>
      <p className="text-4xl font-semibold">{current.temperature_2m}°C</p>
      <p className="text-sm text-gray-600">Feels like {current.apparent_temperature}°C</p>
      <p className="mt-4">Humidity: {current.relative_humidity_2m}%</p>
      <p>Wind: {current.windspeed_10m} km/h</p>
      <p>UV Index: {daily.uv_index_max[0]}</p>
    </div>
  );
}
