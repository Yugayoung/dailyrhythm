import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  name: string;
}
//test
interface currentPositionProps {
  latitude: number;
  longitude: number;
}

export async function fetchWeatherData({
  latitude,
  longitude,
}: currentPositionProps) {
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const weatherIcon = response.data.weather[0].icon;
    const weatherIconAdrs = `https://openweathermap.org/img/w/${weatherIcon}.png`;

    const weatherData: WeatherData = {
      id: response.data.weather[0].id,
      main: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: weatherIconAdrs,
      temp: Math.round(response.data.main.temp),
      temp_min: Math.round(response.data.main.temp_min),
      temp_max: Math.round(response.data.main.temp_max),
      name: response.data.name,
    };

    return weatherData;
  } catch (error) {
    throw new Error('날씨 정보를 가져오는 데 실패했습니다.');
  }
}
