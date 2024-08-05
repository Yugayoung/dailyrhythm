import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';
import styled from 'styled-components';
import { ThemeType } from '../../css/styles.theme';
import { StyledBaseBox } from '../Navbar';

interface RhythmDetailProps {
  totalCount: number;
  doneCount: number;
}

export default function LinearProgreeBar({
  totalCount,
  doneCount,
}: RhythmDetailProps) {
  const [progress, setProgress] = useState(0);
  const targetValue = totalCount === 0 ? 0 : (doneCount / totalCount) * 100;
  const currentTheme = useGetCurrentTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < targetValue) {
          return Math.min(prevProgress + 10, targetValue);
        } else if (prevProgress > targetValue) {
          return Math.max(prevProgress - 10, targetValue);
        } else {
          clearInterval(timer);
          return prevProgress;
        }
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [targetValue]);

  return (
    <LinearProgressBox>
      <CustomLinearProgress
        variant='determinate'
        value={progress}
        $currentTheme={currentTheme}
      />
      <LinearProgressTextBox>
        <LinearProgressText>{Math.round(progress)}</LinearProgressText>
        <p>%</p>
      </LinearProgressTextBox>
    </LinearProgressBox>
  );
}

const CustomLinearProgress = styled(LinearProgress)<{
  $currentTheme: ThemeType;
}>`
  width: 100%;
  border-radius: 5px;
  &.css-eglki6-MuiLinearProgress-root {
    background-color: ${({ $currentTheme }) => $currentTheme.progressBaBgColor};
    height: 0.5rem;
  }
  .MuiLinearProgress-bar {
    background-color: ${({ $currentTheme }) => $currentTheme.progressBarColor};
  }
`;
const LinearProgressBox = styled(StyledBaseBox)`
  width: 100%;
`;

const LinearProgressTextBox = styled.div`
  font-size: 0.6rem;
  text-align: end;
  width: 4rem;
  margin: 0rem 1rem;
  display: flex;
  align-items: center;
  justify-content: end;
`;
const LinearProgressText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;
