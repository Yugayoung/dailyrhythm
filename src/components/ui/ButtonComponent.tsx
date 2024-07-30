import React from 'react';
import styled from 'styled-components';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';
import { ThemeType } from '../../css/styles.theme';

interface ButtonComponentProps {
  onClick?: () => void;
  text?: React.ReactNode;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  textSize?: string;
  width?: string;
}

export default function ButtonComponent({
  onClick,
  text = '확인',
  backgroundColor,
  hoverBackgroundColor,
  textColor,
  textSize = '0.8rem',
  width = 'auto',
}: ButtonComponentProps) {
  const currentTheme = useGetCurrentTheme();
  const defaultBackgroundColor = backgroundColor || currentTheme.secondaryColor;
  const defaultHoverBackgroundColor = hoverBackgroundColor || 'transparent';
  const defaultTextColor = textColor || currentTheme.textColor;

  return (
    <StyledButton
      onClick={onClick}
      $currentTheme={currentTheme}
      $backgroundColor={defaultBackgroundColor}
      $hoverBackgroundColor={defaultHoverBackgroundColor}
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
  $hoverBackgroundColor: string;
  $textColor: string;
  $textSize: string;
  $width: string;
  $currentTheme: ThemeType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.7rem;
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  border-radius: 0.7rem;
  border: 3px solid ${({ $backgroundColor }) => $backgroundColor};
  font-size: ${({ $textSize }) => $textSize};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  width: ${({ $width }) => $width};
  transition: 200ms;

  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
    color: ${({ $currentTheme }) => $currentTheme.textColor};
    border: 3px solid ${({ $backgroundColor }) => $backgroundColor};
  }
`;
