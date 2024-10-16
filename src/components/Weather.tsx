import React, { useEffect, useState } from 'react';
import { WeatherData, fetchWeatherData } from '../api/weather';
import styled from 'styled-components';
import Loading from './ui/Loading';
import { lightTheme } from '../css/styles.theme';
import { StyledBaseBox } from './Navbar';

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const watchPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: 'geolocation',
        });

        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'granted') {
            getLocationAndFetchWeather();
          } else if (permissionStatus.state === 'denied') {
            setWeather(null);
          }
        };

        if (permissionStatus.state === 'granted') {
          getLocationAndFetchWeather();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const data = await fetchWeatherData({ latitude, longitude });
              setWeather(data);
            } catch (error) {
              console.error('날씨 정보를 가져오는 데 실패했습니다.', error);
            } finally {
              setIsLoading(false);
            }
          },
          (err) => {
            console.error('위치 정보 오류', err);
            setIsLoading(false);
          }
        );
      } else {
        console.error('브라우저가 geolocation을 지원하지 않음');
        setIsLoading(false);
      }
    };

    watchPermission();
  }, []);

  return (
    <StyledWeatherBox>
      {isLoading ? (
        <StyledWeatherAndLoadingBox>
          <Loading />
        </StyledWeatherAndLoadingBox>
      ) : !!weather ? (
        <div>
          <p>{weather.name}</p>
          <StyledTempTopBox>
            <StyledWeatherImg
              src={weather.icon}
              alt='weather icon'
              loading='lazy'
            />
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

const StyledWeatherBox = styled(StyledBaseBox)`
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
