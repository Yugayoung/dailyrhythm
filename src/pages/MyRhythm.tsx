import React, { useState } from 'react';
import styled from 'styled-components';
import RhythmList from '../components/RhythmList';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType } from '../css/styles.theme';
import CalendarComponent from '../components/CalendarComponent';
import { StyledBaseBox } from '../components/Navbar';
import { BREAKPOINTS } from '../css/styles.width';

export default function MyRhythm() {
  const currentTheme = useGetCurrentTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <StyledHomeWrapper $currentTheme={currentTheme}>
      <StyledHomeBox>
        <CalendarComponent onDateChange={handleDateChange} />
        <RhythmList selectedDate={selectedDate} />
      </StyledHomeBox>
    </StyledHomeWrapper>
  );
}

const StyledHomeWrapper = styled.section<{ $currentTheme: ThemeType }>`
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: ${({ $currentTheme }) => $currentTheme.bodyBgColor};
  @media (min-width: ${BREAKPOINTS.smallDesktop}) {
    height: 100vh;
  }
`;
const StyledHomeBox = styled(StyledBaseBox)`
  position: relative;
  margin-top: 0rem;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    display: grid;
    margin-top: 8rem;
  }
`;
