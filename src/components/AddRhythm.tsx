import React, { useEffect, useRef, useState } from 'react';
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
  const iconOptions = ['✅', '💊', '💪', '📖', '🔥'];
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

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setRhythm({ ...rhythm, icon });
    setIsVisible(false);
  };

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
          <StyledSelectIconButton type='button' onClick={handleButtonClick}>
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

const StyledSelectIconBox = styled.div`
  display: flex;
  align-items: center;
`;
const StyledIconOptionWrapper = styled.div`
  display: flex;
  position: relative;
  background: ${color.lightGray};
  border-radius: 0.4em;
  font-size: 1.3rem;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: ${color.lightGray};
    border-left: 0;
    margin-top: -10px;
    margin-left: -10px;
  }
`;
const StyledIconOptionBox = styled.div<{ $isVisible: boolean }>`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;

const StyledIconOption = styled.div<{ $isSelected: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${({ $isSelected }) =>
    $isSelected ? lightTheme.accentColor : 'transparent'};
  &:hover {
    background-color: ${lightTheme.accentColor};
  }
`;

const StyledSelectIconButton = styled.button`
  border-radius: 100%;
  border: none;
  font-size: 2.5rem;
  width: 4.5rem;
  height: 4.5rem;
  margin-right: 1rem;
  background-color: transparent;
  border: 3px solid ${darkTheme.primaryColor};
`;
