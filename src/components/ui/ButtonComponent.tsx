import React from 'react';
import styled from 'styled-components';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';

interface ButtonComponentProps {
  onClick?: () => void;
  text?: string | React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  width?: string;
}

export default function ButtonComponent({
  onClick,
  text = '확인',
  backgroundColor,
  textColor,
  width = 'auto',
}: ButtonComponentProps) {
  const currentTheme = useGetCurrentTheme();
  const defaultBackgroundColor = backgroundColor || currentTheme.secondaryColor;
  const defaultTextColor = textColor || currentTheme.textColor;

  return (
    <StyledButton
      onClick={onClick}
      $backgroundColor={defaultBackgroundColor}
      $textColor={defaultTextColor}
      $width={width}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $backgroundColor: string;
  $textColor: string;
  $width: string;
}>`
  padding: 0.7rem 1rem;
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  border-radius: 0.7rem;
  border-color: ${({ $backgroundColor }) => $backgroundColor};
  font-size: 0.8rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  width: ${({ $width }) => $width};

  &:hover {
    opacity: 0.8;
  }
`;
