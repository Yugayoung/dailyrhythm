import React, { useState } from 'react';
import ButtonComponent from './ui/ButtonComponent';
import Loading from './ui/Loading';
import { useGetUser } from '../store/useUserStore';
import styled from 'styled-components';
import dayjs from 'dayjs';
import SelectIcon from './SelectIcon';
import RhythmTitleInput from './RhythmTitleInput';
import { useAddRhythm } from '../hooks/useAddRhythm';
import TimeAndPeriod from './TimeAndPeriod';
import SelectHighlighter from './SelectHighlighter';
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
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  backgroundColor: '',
  icon: '✅',
  status: '',
};

interface CloseModalProps {
  onClick: () => void;
}

export default function AddRhythm({ onClick }: CloseModalProps) {
  const [rhythm, setRhythm] = useState(initialRhythm);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('✅');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('');
  const user = useGetUser();
  const uid = user.uid;
  const addRhythm = useAddRhythm(uid);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setSelectedIcon('✅');
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRhythm((rhythm) => ({ ...rhythm, [name]: value }));
  }

  const handleColorSelect = (backgroundColor: string) => {
    if (selectedBackgroundColor === backgroundColor) {
      setSelectedBackgroundColor('');
      setRhythm({ ...rhythm, backgroundColor: '' });
    } else {
      setSelectedBackgroundColor(backgroundColor);
      setRhythm({ ...rhythm, backgroundColor });
    }
  };

  function handleTimeChange(time: dayjs.Dayjs | null, timeString: string) {
    setRhythm((rhythm) => ({ ...rhythm, time: timeString }));
  }

  function handleRangeChange(
    dates: [dayjs.Dayjs, dayjs.Dayjs],
    dateStrings: [string, string]
  ) {
    setRhythm((rhythm) => ({
      ...rhythm,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    }));
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
        <SelectIcon
          selectedIcon={selectedIcon}
          onSelect={(icon) => {
            setSelectedIcon(icon);
            setRhythm({ ...rhythm, icon });
          }}
        />
        <RhythmTitleInput title={rhythm.title} onChange={handleChange} />
        <TimeAndPeriod
          time={rhythm.time}
          startDate={rhythm.startDate}
          endDate={rhythm.endDate}
          onTimeChange={handleTimeChange}
          onRangeChange={handleRangeChange}
        />
        <SelectHighlighter
          selectedBackgroundColor={selectedBackgroundColor}
          onColorSelect={handleColorSelect}
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
  gap: 1rem;
`;
