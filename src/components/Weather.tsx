import React, { useEffect, useState } from 'react';
import { WeatherData, fetchWeatherData } from '../api/weather';
import styled from 'styled-components';
import Loading from './ui/Loading';

export default function Weather() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (err) => {
              console.error('위치 정보 오류');
              setIsLoading(false);
            }
          );
        } else {
          console.error('브라우저가 geolocation을 지원하지 않음');
          setIsLoading(false);
        }
        if (latitude !== null && longitude !== null) {
          const data = await fetchWeatherData({ latitude, longitude });
          setWeather(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <StyledWeatherBox>
      {isLoading ? (
        <Loading />
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
