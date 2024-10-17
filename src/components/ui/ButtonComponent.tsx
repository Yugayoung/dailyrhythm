import React from 'react';
import styled from 'styled-components';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';
import { ThemeType } from '../../css/styles.theme';

interface ButtonComponentProps {
  onClick?: () => void;
  className?: string;
  text?: React.ReactNode;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  textColor?: string;
  textSize?: string;
  width?: string;
  'aria-label'?: string;
}

export default function ButtonComponent({
  onClick,
  'aria-label': ariaLabel,
  className,
  text = '확인',
  backgroundColor,
  hoverBackgroundColor = 'transparent',
  hoverTextColor,
  textColor,
  textSize = '0.8rem',
  width = 'auto',
}: ButtonComponentProps) {
  const currentTheme = useGetCurrentTheme();
  const defaultBackgroundColor = backgroundColor || currentTheme.secondaryColor;
  const defaultHoverTextColor = hoverTextColor || currentTheme.errorColor;
  const defaultTextColor = textColor || currentTheme.textColor;

  return (
    <StyledButton
      onClick={onClick}
      $currentTheme={currentTheme}
      $backgroundColor={defaultBackgroundColor}
      $hoverBackgroundColor={hoverBackgroundColor}
      $hoverTextColor={defaultHoverTextColor}
      $textColor={defaultTextColor}
      $textSize={textSize}
      $width={width}
      className={className}
      aria-label={ariaLabel}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $backgroundColor: string;
  $hoverBackgroundColor: string;
  $hoverTextColor: string;
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

  &.padding-none {
    padding: 0px;
  }
  &.dropdown {
    font-weight: 100;
  }

  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
    color: ${({ $hoverTextColor }) => $hoverTextColor};
    border: 3px solid ${({ $backgroundColor }) => $backgroundColor};
  }

  &.focusEffect {
    &:focus {
      color: ${({ $hoverTextColor }) => $hoverTextColor};
    }
  }
`;
