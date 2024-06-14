import React, { useEffect, useState } from 'react';
import { WeatherData, fetchWeatherData } from '../api/weather';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { useGetCurrentTheme } from '../store/useDarkModeStore';

export default function Weather() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentTheme = useGetCurrentTheme();

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
    <StyledWeatherBox>
      {isLoading ? (
        <BeatLoader color={currentTheme.placeholderColor} size={6} />
      ) : (
        weather && (
          <div>
            <p>{weather.name}</p>
            <StyledTempTopBox>
              <StyledWeatherImg src={weather.icon} alt='weather icon' />
              <StyledWeatherText>{weather.temp}°</StyledWeatherText>
            </StyledTempTopBox>
          </div>
        )
      )}
    </StyledWeatherBox>
  );
}

const StyledWeatherBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  width: 7rem;
  color: ${(props) => props.theme.placeholderColor};
  font-weight: bold;
`;

const StyledTempTopBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StyledWeatherText = styled.p`
  font-family: 'GmarketSansMedium';
  font-size: 1.1rem;
`;

const StyledWeatherImg = styled.img`
  width: 2.8rem;
  opacity: 0.8;
`;
