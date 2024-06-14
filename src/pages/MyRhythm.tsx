import React from 'react';
import styled from 'styled-components';
import Weather from '../components/Weather';
import Calendar from '../components/Calendar';

export default function MyRhythm() {
  return (
    <StyledHomeWrapper>
      <StyledHomeBox>
        <Weather />
        <Calendar />
      </StyledHomeBox>
    </StyledHomeWrapper>
  );
}

const StyledHomeWrapper = styled.section`
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100vh;
`;
const StyledHomeBox = styled.div`
  position: relative;
`;
