import React, { useState } from 'react';
import ButtonComponent from './ui/ButtonComponent';
import Loading from './ui/Loading';
import { addOrUpdateNewRhythm } from '../api/firebase';
import { useGetUser } from '../store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { color, darkTheme, lightTheme } from '../css/styles.theme';
export interface RhythmItem {
  id: string;
  time: string;
  title: string;
  startDate?: string;
  endDate?: string;
  backgroundColor?: string;
  icon?: string;
  status: string;
}

const initialRhythm: RhythmItem = {
  id: '',
  time: '',
  title: '',
  startDate: '',
  endDate: '',
  backgroundColor: '',
  icon: '',
  status: '',
};

interface ModalProps {
  onClick: () => void;
}

export default function AddRhythm({ onClick }: ModalProps) {
  const [rhythm, setRhythm] = useState<RhythmItem>(initialRhythm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useGetUser();
  const uid = user.uid;
  const queryClient = useQueryClient();

  const addRhythm = useMutation<
    void,
    Error,
    { uid: string; rhythm: RhythmItem }
  >({
    mutationFn: ({ uid, rhythm }) => addOrUpdateNewRhythm(uid, rhythm),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rhythms', uid] });
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRhythm((rhythm) => ({ ...rhythm, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (rhythm.title.trim() === '') {
        // ui 완성된 후 색 변화로 알려주도록 작성해야함!
        return;
      }
      addRhythm.mutate(
        { rhythm, uid },
        {
          onSuccess: () => {
            setRhythm(initialRhythm);
            onClick();
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <StyledAddRhythmHead>
        <h2>루틴 추가하기</h2>
        <ButtonComponent
          onClick={onClick}
          text={'❌'}
          backgroundColor={'transparent'}
          width={'1.5rem'}
        />
      </StyledAddRhythmHead>
      <StyledAddRhythmForm onSubmit={handleSubmit}>
        <StyledAddRhythmTextInput
          type='text'
          name='title'
          value={rhythm.title ?? ''}
          placeholder='Title'
          required
          onChange={handleChange}
        />
        <StyledAddRhythmTextInput
          type='text'
          name='time'
          value={rhythm.time ?? ''}
          placeholder='Time'
          required
          onChange={handleChange}
        />

        <input
          type='date'
          name='startDate'
          value={rhythm.startDate ?? ''}
          placeholder='Start Date'
          required
          onChange={handleChange}
        />
        <input
          type='date'
          name='endDate'
          value={rhythm.endDate ?? ''}
          placeholder='End Date'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='backgroundColor'
          value={rhythm.backgroundColor ?? ''}
          placeholder='리듬색'
          onChange={handleChange}
        />
        <input
          type='text'
          name='icon'
          value={rhythm.icon ?? ''}
          placeholder='아이콘'
          onChange={handleChange}
        />
        <ButtonComponent text={isLoading ? <Loading /> : 'rhythm 추가'} />
      </StyledAddRhythmForm>
    </section>
  );
}

const StyledAddRhythmHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'GmarketSansMedium';
  margin-bottom: 1rem;
`;

const StyledAddRhythmForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const StyledAddRhythmTextInput = styled.input`
  width: 97%;
  padding: 0.5rem;
  border: none;
  background-color: ${color.gray};
  font-size: 1.1rem;
`;
