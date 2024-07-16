import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';
import styled from 'styled-components';
import { ThemeType } from '../../css/styles.theme';

interface AnimatedCircularProgressbarProps {
  totalValue: number;
  doneCountValue: number;
  width?: string;
}

export default function AnimatedCircularProgressbarComponent({
  doneCountValue,
  totalValue,
  width = '10rem',
}: AnimatedCircularProgressbarProps) {
  const currentTheme = useGetCurrentTheme();
  const [progress, setProgress] = useState(0);
  let duration = 2000;

  const targetValue = (doneCountValue / totalValue) * 100;

  useEffect(() => {
    let start = 0;
    const increment = targetValue / (duration / 10);
    const interval = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        start = targetValue;
        clearInterval(interval);
      }
      setProgress(start);
    }, 10);

    return () => clearInterval(interval);
  }, [targetValue, duration]);

  return (
    <StyledCircularProgressbarBox $width={width}>
      <StyledCircularProgressbar
        value={progress}
        text={`${Math.round(progress)}%`}
        $currentTheme={currentTheme}
      />
    </StyledCircularProgressbarBox>
  );
}

const StyledCircularProgressbarBox = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  margin: 1rem;
`;

const StyledCircularProgressbar = styled(CircularProgressbar)<{
  $currentTheme: ThemeType;
}>`
  .CircularProgressbar-path {
    stroke: ${({ $currentTheme }) => $currentTheme.primaryColor};
  }
  .CircularProgressbar-trail {
    stroke: ${({ $currentTheme }) => $currentTheme.placeholderColor};
  }
  .CircularProgressbar-text {
    dominant-baseline: middle;
    text-anchor: middle;
    font-weight: bold;
    fill: ${({ $currentTheme }) => $currentTheme.textColor};
  }
`;
