import React, { useState } from 'react';
import ButtonComponent from './ui/ButtonComponent';
import Loading from './ui/Loading';
import { addOrUpdateNewRhythm } from '../api/firebase';
import { useGetUser } from '../store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

export default function AddRhythm() {
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
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='time'
          value={rhythm.time ?? ''}
          placeholder='시간'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={rhythm.title ?? ''}
          placeholder='내용'
          required
          onChange={handleChange}
        />
        <input
          type='date'
          name='startDate'
          value={rhythm.startDate ?? ''}
          placeholder='시작 일자'
          required
          onChange={handleChange}
        />
        <input
          type='date'
          name='endDate'
          value={rhythm.endDate ?? ''}
          placeholder='종료 일자'
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
      </form>
    </section>
  );
}
