import React from 'react';
import styled from 'styled-components';
import RhythmList from '../components/RhythmList';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType } from '../css/styles.theme';
import CalendarComponent from '../components/CalendarComponent';

export default function MyRhythm() {
  const currentTheme = useGetCurrentTheme();

  return (
    <StyledHomeWrapper $currentTheme={currentTheme}>
      <StyledHomeBox>
        <CalendarComponent />
        <RhythmList />
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
  background-color: ${({ $currentTheme }) => $currentTheme.bgColor};
`;
const StyledHomeBox = styled.div`
  position: relative;
`;
