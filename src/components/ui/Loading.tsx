import React from 'react';
import { BeatLoader } from 'react-spinners';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';
import styled from 'styled-components';
import { StyledBaseBox } from '../Navbar';

interface LoadingComponentProps {
  color?: string;
  size?: number;
}

export default function Loading({ color, size }: LoadingComponentProps) {
  const currentTheme = useGetCurrentTheme();
  const defaultColor = color || currentTheme.placeholderColor;
  const defaultSize = size || '8px';

  return (
    <StyledLoadingBox>
      <BeatLoader color={defaultColor} size={defaultSize} />
      <span>Loding</span>
    </StyledLoadingBox>
  );
}

const StyledLoadingBox = styled(StyledBaseBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
