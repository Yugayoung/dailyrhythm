import React from 'react';
import styled from 'styled-components';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';
import { lightTheme } from '../../css/styles.theme';

interface ButtonComponentProps {
  onClick?: () => void;
  text?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  textSize?: string;
  width?: string;
}

export default function ButtonComponent({
  onClick,
  text = '확인',
  backgroundColor,
  textColor,
  textSize = '0.8rem',
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
      $textSize={textSize}
      $width={width}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $backgroundColor: string;
  $textColor: string;
  $textSize: string;
  $width: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 0.8rem;
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  border-radius: 0.7rem;
  border: 2px solid ${({ $backgroundColor }) => $backgroundColor};
  font-size: ${({ $textSize }) => $textSize};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  width: ${({ $width }) => $width};
  transition: 400ms;

  &:hover,
  &:focus {
    background-color: ${lightTheme.bgColor};
    color: ${lightTheme.textColor};
    border: 2px solid ${({ $backgroundColor }) => $backgroundColor};
  }
`;
