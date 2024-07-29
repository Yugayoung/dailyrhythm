import React from 'react';
import styled from 'styled-components';
import { darkTheme, lightTheme } from '../css/styles.theme';
import { PiPencilCircleFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa';
import { highlighter } from '../css/styles.highlighter';
import { StyledBaseBox } from './Navbar';

interface SelectHighlighterProps {
  selectedBackgroundColor: string;
  onColorSelect: (backgroundColor: string) => void;
}

function SelectHighlighter({
  selectedBackgroundColor,
  onColorSelect,
}: SelectHighlighterProps) {
  return (
    <>
      <StyledAddRhythmTitle>
        <StyledAddRhythmIcon $fontSize={'1.4rem'}>
          <PiPencilCircleFill />
        </StyledAddRhythmIcon>
        Highlighter
      </StyledAddRhythmTitle>
      <StyledAddRhythmColorWrapper>
        {Object.keys(highlighter).map((colorKey: keyof typeof highlighter) => (
          <StyledAddRhythmColor
            key={colorKey}
            onClick={() => onColorSelect(highlighter[colorKey])}
            $color={highlighter[colorKey]}
            $isSelected={selectedBackgroundColor === highlighter[colorKey]}
          >
            {selectedBackgroundColor === highlighter[colorKey] ? (
              <FaCheck />
            ) : (
              ''
            )}
          </StyledAddRhythmColor>
        ))}
      </StyledAddRhythmColorWrapper>
    </>
  );
}
export default React.memo(SelectHighlighter);

const StyledAddRhythmTitle = styled.h2`
  display: flex;
  align-items: center;
  margin: 0.5rem 0rem 0.7rem 0rem;
  font-size: 1.1rem;
`;
const StyledAddRhythmIcon = styled.div<{ $fontSize: string }>`
  font-size: ${({ $fontSize }) => $fontSize};
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
`;

const StyledAddRhythmColorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const StyledAddRhythmColor = styled(StyledBaseBox)<{
  $color: string;
  $isSelected: boolean;
}>`
  background-color: ${({ $color }) => $color};
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 100%;
  border: 2px solid;
  color: ${darkTheme.errorColor};
  opacity: ${({ $isSelected }) => ($isSelected ? '0.8' : '1')};
  border-color: ${({ $isSelected }) =>
    $isSelected ? darkTheme.secondaryColor : lightTheme.placeholderColor};
`;
