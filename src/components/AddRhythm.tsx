import React, { useEffect, useState } from 'react';
import ButtonComponent from './ui/ButtonComponent';
import Loading from './ui/Loading';
import { useGetUser } from '../store/useUserStore';
import styled from 'styled-components';
import dayjs from 'dayjs';
import SelectIcon from './SelectIcon';
import RhythmTitleInput from './RhythmTitleInput';
import { useRhythm } from '../hooks/useRhythm';
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

interface RhythmListProps {
  onClick: () => void;
  rhythm?: RhythmItem;
}

export default function AddRhythm({
  onClick,
  rhythm: selectedRhythm,
}: RhythmListProps) {
  const [rhythm, setRhythm] = useState(initialRhythm);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('✅');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('');
  const user = useGetUser();
  const uid = user.uid;
  const { addNewRhythm, removeRhythm, updateRhythm } = useRhythm(uid);

  useEffect(() => {
    if (selectedRhythm) {
      setRhythm(selectedRhythm);
      setSelectedIcon(selectedRhythm.icon);
      setSelectedBackgroundColor(selectedRhythm.backgroundColor);
    }
  }, [selectedRhythm]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (rhythm.title.trim() === '') {
        // ui 완성된 후 색 변화로 알려주도록 작성해야함!
        return;
      }
      addNewRhythm.mutate(
        { rhythm, uid },
        {
          onSuccess: handleSuccess,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleDeleteRhythm() {
    setIsLoading(true);
    try {
      removeRhythm.mutate(
        { uid, rhythm: selectedRhythm },
        {
          onSuccess: handleSuccess,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleUpdateRhythm() {
    setIsLoading(true);
    try {
      updateRhythm.mutate(
        {
          uid,
          rhythm: {
            ...selectedRhythm,
            time: rhythm.time,
            title: rhythm.title,
            startDate: rhythm.startDate,
            endDate: rhythm.endDate,
            icon: selectedIcon,
            backgroundColor: selectedBackgroundColor,
          },
        },
        {
          onSuccess: handleSuccess,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuccess() {
    setRhythm(initialRhythm);
    setSelectedIcon('✅');
    setSelectedBackgroundColor('');
    onClick();
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
        {!selectedRhythm && (
          <StyledRhythmAddButtonWrapper>
            <ButtonComponent
              text={isLoading ? <Loading /> : 'rhythm 추가'}
              width={'100%'}
            />
          </StyledRhythmAddButtonWrapper>
        )}
      </StyledAddRhythmForm>
      {selectedRhythm && (
        <StyledRhythmRemoveUpdateButtonWrapper>
          <ButtonComponent
            text={isLoading ? <Loading /> : '수정'}
            onClick={handleUpdateRhythm}
            width={'100%'}
          />
          <ButtonComponent
            text={isLoading ? <Loading /> : '삭제'}
            onClick={handleDeleteRhythm}
            width={'100%'}
          />
        </StyledRhythmRemoveUpdateButtonWrapper>
      )}
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

const StyledRhythmAddButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0rem;
`;
const StyledRhythmRemoveUpdateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0rem;
  gap: 4rem;
`;
