import React from 'react';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import RhythmStatisticsComponent from '../components/RhythmStatisticsComponent';
import styled from 'styled-components';
import { ThemeType } from '../css/styles.theme';
import { StyledBaseBox } from '../components/Navbar';
import { BREAKPOINTS } from '../css/styles.width';

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
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    height: auto;
  }
`;
const StyledHomeBox = styled(StyledBaseBox)`
  position: relative;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    display: grid;
    margin: 1rem 0rem;
  }
`;
