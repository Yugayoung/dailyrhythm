import React from 'react';
import { color } from '../css/styles.theme';
import styled from 'styled-components';

interface TitleInputProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RhythmTitleInput({ title, onChange }: TitleInputProps) {
  return (
    <>
      <StyledAddRhythmTextInput
        type='text'
        name='title'
        value={title}
        placeholder='Title'
        onChange={onChange}
        required
      />
    </>
  );
}

export default React.memo(RhythmTitleInput);

const StyledAddRhythmTextInput = styled.input`
  width: 97%;
  padding: 0.5rem;
  border: none;
  background-color: ${color.gray};
  font-size: 1.1rem;
`;
