import React, { useCallback, useState } from 'react';
import { color } from '../css/styles.theme';
import styled from 'styled-components';
import { RhythmItem } from './AddRhythm';

interface TitleInputProps {
  title: string;
  setRhythm: (rhythm: (prevRhythm: RhythmItem) => RhythmItem) => void;
}

export default function RhythmTitleInput({
  title,
  setRhythm,
}: TitleInputProps) {
  const [inputValue, setInputValue] = useState(title);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setInputValue(value);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setRhythm((prevRhythm) => ({ ...prevRhythm, title: value }));
      }, 500);

      setTimeoutId(newTimeoutId);
    },
    [setRhythm, timeoutId]
  );

  return (
    <>
      <StyledAddRhythmTextInput
        type='text'
        name='title'
        value={inputValue}
        placeholder='Title'
        onChange={handleChange}
        required
      />
    </>
  );
}

const StyledAddRhythmTextInput = styled.input`
  width: 97%;
  padding: 0.5rem;
  border: none;
  background-color: ${color.gray};
  font-size: 1.1rem;
`;
