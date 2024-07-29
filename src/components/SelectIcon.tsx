import React, { useState } from 'react';
import { color, darkTheme, lightTheme } from '../css/styles.theme';
import styled from 'styled-components';

interface SelectIconProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

const ICON_OPTIONS = ['✅', '💊', '💪', '📖', '⭐️', '👍🏻', '😋'];

export default function SelectIcon({
  selectedIcon,
  onSelect,
}: SelectIconProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleIconSelect = (icon: string) => {
    onSelect(icon);
    setIsVisible(false);
  };

  return (
    <>
      <StyledSelectIconBox>
        <StyledSelectIconButton type='button' onClick={handleVisibleClick}>
          {selectedIcon}
        </StyledSelectIconButton>
        {isVisible && (
          <div>
            <StyledIconOptionWrapper>
              {ICON_OPTIONS.map((icon) => (
                <StyledIconOption
                  key={icon}
                  onClick={() => handleIconSelect(icon)}
                  $isSelected={icon === selectedIcon}
                >
                  {icon}
                </StyledIconOption>
              ))}
            </StyledIconOptionWrapper>
          </div>
        )}
      </StyledSelectIconBox>
    </>
  );
}

const StyledSelectIconBox = styled.div`
  display: flex;
  align-items: center;
`;
const StyledIconOptionWrapper = styled.div`
  display: flex;
  position: relative;
  background: ${color.lightGray};
  border-radius: 1rem;
  font-size: 1.3rem;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 11px solid transparent;
    border-right-color: ${color.lightGray};
    border-left: 0;
    margin-top: -11px;
    margin-left: -10px;
  }
`;

const StyledIconOption = styled.div<{ $isSelected: boolean }>`
  padding: 0.7rem;
  cursor: pointer;
  background-color: ${({ $isSelected }) =>
    $isSelected ? lightTheme.accentColor : 'transparent'};
  &:hover {
    background-color: ${lightTheme.accentColor};
  }
  &:first-child {
    border-radius: 1rem 0rem 0rem 1rem;
    &:hover {
      background-color: ${lightTheme.accentColor};
    }
  }

  &:last-child {
    border-radius: 0rem 1rem 1rem 0rem;
    &:hover {
      background-color: ${lightTheme.accentColor};
    }
  }
`;

const StyledSelectIconButton = styled.button`
  border-radius: 100%;
  border: none;
  font-size: 2rem;
  width: 4.5rem;
  height: 4.5rem;
  margin-right: 1rem;
  background-color: transparent;
  border: 3px solid ${darkTheme.primaryColor};
`;
