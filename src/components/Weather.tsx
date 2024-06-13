import React, { useEffect, useState } from 'react';
import { WeatherData, fetchWeatherData } from '../api/weather';
import { BeatLoader } from 'react-spinners';

export default function Weather() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const getWeather = async () => {
        try {
          const data = await fetchWeatherData({ latitude, longitude });
          setWeather(data);
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      };
      getWeather();
    }
  }, [latitude, longitude]);

  return (
    <div>
      <h1>현재 위치의 날씨</h1>
      {isLoading ? (
        <BeatLoader />
      ) : (
        weather && (
          <div>
            <p>위치: {weather.name}</p>
            <p>온도: {weather.temp}°C</p>
            <p>날씨: {weather.description}</p>
            <img src={weather.icon} alt='weather icon' />
          </div>
        )
      )}
    </div>
  );
}
