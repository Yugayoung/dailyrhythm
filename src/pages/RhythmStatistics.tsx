import React from 'react';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import RhythmStatisticsComponent from '../components/RhythmStatisticsComponent';
import styled from 'styled-components';
import { ThemeType } from '../css/styles.theme';

export default function RhythmStatistics() {
  const currentTheme = useGetCurrentTheme();
  return (
    <StyledHomeWrapper $currentTheme={currentTheme}>
      <StyledHomeBox>
        <RhythmStatisticsComponent />
      </StyledHomeBox>
    </StyledHomeWrapper>
  );
}

const StyledHomeWrapper = styled.section<{ $currentTheme: ThemeType }>`
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ $currentTheme }) => $currentTheme.bodyBgColor};
  @media (max-width: 768px) {
    height: auto;
  }
`;
const StyledHomeBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  @media (max-width: 768px) {
    display: grid;
    margin: 1rem 0rem;
  }
`;
