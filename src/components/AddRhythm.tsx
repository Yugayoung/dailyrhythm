import React, { useCallback, useEffect, useState } from 'react';
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
import { StyledBaseBox } from './Navbar';
import Modal from './ui/Modal';
import { useModal } from '../hooks/useModal';
import ConfirmModal from './ui/ConfirmModal';
export interface RhythmItem {
  id: string;
  time: string;
  title: string;
  startDate?: string;
  endDate?: string;
  backgroundColor?: string;
  icon?: string;
  status: {
    [date: string]: string;
  };
}

const initialRhythm: RhythmItem = {
  id: '',
  time: '',
  title: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  backgroundColor: '',
  icon: '✅',
  status: {
    [dayjs().format('YYYY-MM-DD')]: 'active',
  },
};

interface RhythmListProps {
  onClick: () => void;
  rhythm?: RhythmItem;
  selectedDate?: Date;
}

export default function AddRhythm({
  onClick,
  rhythm: selectedRhythm,
  selectedDate,
}: RhythmListProps) {
  const [rhythm, setRhythm] = useState(initialRhythm);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('✅');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('');
  const user = useGetUser();
  const uid = user.uid;
  const { addNewRhythm, removeRhythm, updateRhythm } = useRhythm(uid);
  const [inputValue, setInputValue] = useState(rhythm.title);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const {
    isOpen: isUpdateModalOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const {
    isOpen: isCloseModalOpen,
    openModal: openCloseModal,
    closeModal: closeCloseModal,
  } = useModal();

  useEffect(() => {
    if (selectedRhythm) {
      setRhythm({
        ...selectedRhythm,
        startDate: dayjs(selectedRhythm.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(selectedRhythm.endDate).format('YYYY-MM-DD'),
      });
      setInputValue(selectedRhythm.title);
      setSelectedIcon(selectedRhythm.icon);
      setSelectedBackgroundColor(selectedRhythm.backgroundColor);
    } else if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      setRhythm({
        ...initialRhythm,
        startDate: formattedDate,
        endDate: formattedDate,
      });
    }
  }, [selectedRhythm, selectedDate]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (rhythm.title.trim() === '') {
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
    setInputValue('');
    setSelectedIcon('✅');
    setSelectedBackgroundColor('');
    onClick();
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setInputValue(value);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setRhythm((rhythm) => ({ ...rhythm, title: value }));
      }, 500);

      setTimeoutId(newTimeoutId);
    },
    [setRhythm, timeoutId]
  );

  const handleColorSelect = useCallback(
    (backgroundColor: string) => {
      if (selectedBackgroundColor === backgroundColor) {
        setSelectedBackgroundColor('');
        setRhythm({ ...rhythm, backgroundColor: '' });
      } else {
        setSelectedBackgroundColor(backgroundColor);
        setRhythm({ ...rhythm, backgroundColor });
      }
    },
    [selectedBackgroundColor, rhythm]
  );

  const handleTimeChange = useCallback(
    (time: dayjs.Dayjs | null, timeString: string) => {
      setRhythm((rhythm) => ({ ...rhythm, time: timeString }));
    },
    []
  );

  const handleRangeChange = useCallback(
    (dates: [dayjs.Dayjs, dayjs.Dayjs], dateStrings: [string, string]) => {
      setRhythm((rhythm) => ({
        ...rhythm,
        startDate: dateStrings[0],
        endDate: dateStrings[1],
      }));
    },
    []
  );
  function handleCloseConfirm() {
    closeCloseModal();
    onClick();
  }

  return (
    <section>
      <StyledAddRhythmHead>
        <h2>루틴 추가하기</h2>
        <ButtonComponent
          onClick={openCloseModal}
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
        <RhythmTitleInput title={inputValue} onChange={handleChange} />
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
            onClick={openUpdateModal}
            text={'수정'}
            width={'100%'}
          />
          <Modal isOpen={isUpdateModalOpen}>
            <ConfirmModal
              onClick={handleUpdateRhythm}
              onClose={closeUpdateModal}
              message={'수정하시겠습니까?'}
            />
          </Modal>
          <ButtonComponent
            text={isLoading ? <Loading /> : '삭제'}
            onClick={openDeleteModal}
            width={'100%'}
          />
          <Modal isOpen={isDeleteModalOpen}>
            <ConfirmModal
              onClick={handleDeleteRhythm}
              onClose={closeDeleteModal}
              message={
                <>
                  "{rhythm.title}" <br /> 루틴을 삭제하시겠습니까?
                </>
              }
            />
          </Modal>
        </StyledRhythmRemoveUpdateButtonWrapper>
      )}
      <Modal isOpen={isCloseModalOpen}>
        <ConfirmModal
          onClick={handleCloseConfirm}
          onClose={closeCloseModal}
          message={
            <>
              작업이 취소됩니다. <br /> <br />
              닫으시겠습니까?
            </>
          }
        />
      </Modal>
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

const StyledRhythmAddButtonWrapper = styled(StyledBaseBox)`
  margin: 1rem 0rem;
`;
const StyledRhythmRemoveUpdateButtonWrapper = styled(StyledBaseBox)`
  margin: 1rem 0rem;
  gap: 4rem;
`;
