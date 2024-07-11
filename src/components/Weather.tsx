import React, { useEffect, useState } from 'react';
import { WeatherData, fetchWeatherData } from '../api/weather';
import styled from 'styled-components';
import Loading from './ui/Loading';
import { lightTheme } from '../css/styles.theme';

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
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <StyledWeatherBox>
      {isLoading ? (
        <StyledWeatherAndLoadingBox>
          <Loading />
        </StyledWeatherAndLoadingBox>
      ) : weather ? (
        <div>
          <p>{weather.name}</p>
          <StyledTempTopBox>
            <StyledWeatherImg src={weather.icon} alt='weather icon' />
            <StyledWeatherText>{weather.temp}°</StyledWeatherText>
          </StyledTempTopBox>
        </div>
      ) : (
        <StyledWeatherGuideBox>
          날씨 정보를 확인하려면 <br />
          <StyledWeatherGuideTextBox>
            <StyledWeatherGuideText>위치 정보 제공</StyledWeatherGuideText>
            에&nbsp;
            <StyledWeatherGuideText>동의</StyledWeatherGuideText>하세요
          </StyledWeatherGuideTextBox>
        </StyledWeatherGuideBox>
      )}
    </StyledWeatherBox>
  );
}

const StyledWeatherBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: ${(props) => props.theme.placeholderColor};
  font-weight: bold;
`;
const StyledWeatherAndLoadingBox = styled.div`
  width: 7rem;
`;
const StyledWeatherGuideBox = styled.div`
  width: 10rem;
`;
const StyledWeatherGuideTextBox = styled.div`
  display: flex;
`;
const StyledWeatherGuideText = styled.p`
  color: ${lightTheme.errorColor};
`;

const StyledTempTopBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StyledWeatherText = styled.p`
  font-family: 'GmarketSansMedium';
  font-size: 0.8rem;
`;

const StyledWeatherImg = styled.img`
  width: 2.5rem;
  opacity: 0.8;
`;
