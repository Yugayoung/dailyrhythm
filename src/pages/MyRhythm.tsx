import React, { useState } from 'react';
import styled from 'styled-components';
import RhythmList from '../components/RhythmList';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType } from '../css/styles.theme';
import CalendarComponent from '../components/CalendarComponent';

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
  width: 100%;
  background-color: ${({ $currentTheme }) => $currentTheme.bodyBgColor};
`;
const StyledHomeBox = styled.div`
  position: relative;
  margin-top: 9rem;
`;
