import React from 'react';
import { theme } from '../../css/styles.theme';
import styled from 'styled-components';
import { useGetCurrentTheme } from '../../store/useDarkModeStore';

interface ButtonComponentProps {
  onClick: () => void;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function ButtonComponent({
  onClick,
  text = '확인',
  backgroundColor,
  textColor,
}: ButtonComponentProps) {
  const currentThemeName = useGetCurrentTheme();
  const currentTheme =
    currentThemeName === 'dark' ? theme.darkTheme : theme.lightTheme;
  const defaultBackgroundColor = backgroundColor || currentTheme.secondaryColor;
  const defaultTextColor = textColor || currentTheme.textColor;

  return (
    <StyledButton
      onClick={onClick}
      $backgroundColor={defaultBackgroundColor}
      $textColor={defaultTextColor}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $backgroundColor: string;
  $textColor: string;
}>`
  padding: 0.7rem 1rem;
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  border-radius: 0.7rem;
  outline: none;
  border-color: ${({ $backgroundColor }) => $backgroundColor};
  font-size: 0.8rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};

  &:hover {
    opacity: 0.8;
  }
`;
