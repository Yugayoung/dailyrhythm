import React, { useState } from 'react';
import ButtonComponent from './ui/ButtonComponent';
import Loading from './ui/Loading';
import { addOrUpdateNewRhythm } from '../api/firebase';
import { useGetUser } from '../store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { color, darkTheme, lightTheme } from '../css/styles.theme';
import { DatePicker, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FcCalendar, FcAlarmClock } from 'react-icons/fc';
import { PiPencilCircleFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa';
import { highlighter } from '../css/styles.highlighter';
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

interface ModalProps {
  onClick: () => void;
}

export default function AddRhythm({ onClick }: ModalProps) {
  const [rhythm, setRhythm] = useState<RhythmItem>(initialRhythm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<string>('✅');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState<string>('');
  const iconOptions = ['✅', '💊', '💪', '📖', '🔥'];
  const user = useGetUser();
  const uid = user.uid;
  const queryClient = useQueryClient();
  const { RangePicker } = DatePicker;
  const format = 'HH:mm';

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

  const handleVisibleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setRhythm({ ...rhythm, icon });
    setIsVisible(false);
  };
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
        {/* // 진짜 너무어렵네ㅔㅔㅔㅔㅔ
            버튼 클릭하면 아이콘 선택창 조그맣게 만들고
            버튼을 만들어서 대표아이콘 처럼 보익 해보자       
        */}
        <StyledSelectIconBox>
          <StyledSelectIconButton type='button' onClick={handleVisibleClick}>
            {selectedIcon}
          </StyledSelectIconButton>
          <StyledIconOptionBox $isVisible={isVisible}>
            <StyledIconOptionWrapper>
              {iconOptions.map((icon) => (
                <StyledIconOption
                  key={icon}
                  onClick={() => handleIconSelect(icon)}
                  $isSelected={icon === selectedIcon}
                >
                  {icon}
                </StyledIconOption>
              ))}
            </StyledIconOptionWrapper>
          </StyledIconOptionBox>
        </StyledSelectIconBox>

        <StyledAddRhythmTextInput
          type='text'
          name='title'
          value={rhythm.title ?? ''}
          placeholder='Title'
          required
          onChange={handleChange}
        />
        <StyledAddRhythmTimeAndPeriodBox>
          <div>
            <StyledAddRhythmTitle>
              <StyledAddRhythmIcon $fontSize={'1.3rem'}>
                <FcCalendar />
              </StyledAddRhythmIcon>
              Period
            </StyledAddRhythmTitle>
            <Space direction='vertical'>
              <RangePicker
                value={[
                  rhythm.startDate ? dayjs(rhythm.startDate) : null,
                  rhythm.endDate ? dayjs(rhythm.endDate) : null,
                ]}
                onChange={handleRangeChange}
              />
            </Space>
          </div>
          <div>
            <StyledAddRhythmTitle>
              <StyledAddRhythmIcon $fontSize={'1.2rem'}>
                <FcAlarmClock />
              </StyledAddRhythmIcon>
              Time
            </StyledAddRhythmTitle>
            <TimePicker
              value={rhythm.time ? dayjs(rhythm.time, format) : null}
              format={format}
              onChange={handleTimeChange}
            />
          </div>
        </StyledAddRhythmTimeAndPeriodBox>
        <div>
          <StyledAddRhythmTitle>
            <StyledAddRhythmIcon $fontSize={'1.4rem'}>
              <PiPencilCircleFill />
            </StyledAddRhythmIcon>
            Highlighter
          </StyledAddRhythmTitle>
          <StyledAddRhythmColorWrapper>
            {Object.keys(highlighter).map(
              (colorKey: keyof typeof highlighter) => (
                <StyledAddRhythmColor
                  key={colorKey}
                  onClick={() => handleColorSelect(highlighter[colorKey])}
                  $color={highlighter[colorKey]}
                  $isSelected={
                    selectedBackgroundColor === highlighter[colorKey]
                  }
                >
                  {selectedBackgroundColor === highlighter[colorKey] ? (
                    <FaCheck />
                  ) : (
                    ''
                  )}
                </StyledAddRhythmColor>
              )
            )}
          </StyledAddRhythmColorWrapper>
        </div>

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

const StyledAddRhythmTextInput = styled.input`
  width: 97%;
  padding: 0.5rem;
  border: none;
  background-color: ${color.gray};
  font-size: 1.1rem;
`;

// Icon

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
const StyledIconOptionBox = styled.div<{ $isVisible: boolean }>`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
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

// time & period

const StyledAddRhythmTimeAndPeriodBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledAddRhythmIcon = styled.div<{ $fontSize: string }>`
  font-size: ${({ $fontSize }) => $fontSize};
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
`;
const StyledAddRhythmTitle = styled.h2`
  display: flex;
  align-items: center;
  margin: 0.5rem 0rem 0.7rem 0rem;
  font-size: 1.1rem;
`;

// backgroundColor
const StyledAddRhythmColorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const StyledAddRhythmColor = styled.div<{
  $color: string;
  $isSelected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
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
