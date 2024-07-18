import React from 'react';
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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRhythm((prevRhythm) => ({ ...prevRhythm, [name]: value }));
    console.log(`입력된 이름: ${value}`);
  }

  return (
    <>
      <StyledAddRhythmTextInput
        type='text'
        name='title'
        value={title}
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
