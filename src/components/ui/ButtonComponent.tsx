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

  const defaultBackgroundColor = backgroundColor || currentTheme.accentColor;
  const defaultTextColor = textColor || currentTheme.textColor;

  return (
    <StyledButton
      onClick={onClick}
      $backgroundColor={defaultBackgroundColor}
      $textColor={defaultTextColor}
    >
      <div>
        {text.split('').map((char, index) => (
          <span key={index} style={{ transitionDelay: `${index * 0.05}s` }}>
            {char}
          </span>
        ))}
      </div>
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $backgroundColor: string;
  $textColor: string;
}>`
  --shadow: 0 2px 8px -1px ${({ $backgroundColor }) => $backgroundColor};
  --shadow-hover: 0 4px 20px -2px ${({ $backgroundColor }) => $backgroundColor};
  --font-shadow: 1rem;
  --y: 0;
  --m: 0;

  display: block;
  outline: none;
  appearance: none;
  border: none;
  text-decoration: none;
  padding: 1rem 1.3rem;
  font-weight: 700;
  line-height: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  box-shadow: var(--shadow);
  transform: translateY(var(--y)) translateZ(0);
  transition: transform 0.44s ease, box-shadow 0.44s ease;

  div {
    display: flex;
    overflow: hidden;
    text-shadow: 0 0.9rem 0 ${({ $textColor }) => $textColor};
    span {
      display: block;
      backface-visibility: hidden;
      font-style: normal;
      transition: transform 0.44s ease;
      transform: translateY(var(--m)) translateZ(0);
    }
  }

  &:hover {
    --y: -4px;
    --shadow: var(--shadow-hover);
    span {
      --m: calc(1rem * -1);
    }
  }

  &.reverse {
    --font-shadow: calc(1rem * -1);
    &:hover {
      span {
        --m: 1rem;
      }
    }
  }
`;
