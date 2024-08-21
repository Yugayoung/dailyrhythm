import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';
import { FaPlus } from 'react-icons/fa';
import Modal from './ui/Modal';
import AddRhythm from './AddRhythm';
import { RhythmItem } from './AddRhythm';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { useModal } from '../hooks/useModal';

interface SelectedDateProps {
  selectedDate?: any;
}

export default function AddRhythmButton({ selectedDate }: SelectedDateProps) {
  const currentTheme = useGetCurrentTheme();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRhythm, setSelectedRhythm] = useState<RhythmItem | null>(null);

  function handleOpenModal() {
    setSelectedRhythm(null);
    openModal();
  }

  function handleCloseModal() {
    setSelectedRhythm(null);
    closeModal();
  }

  return (
    <>
      <StyledRhythmListAddRhythmButtonWrapper>
        <ButtonComponent
          onClick={handleOpenModal}
          text={
            <>
              <FaPlus /> &nbsp; New Rhythm
            </>
          }
          textSize={'0.8rem'}
          hoverBackgroundColor={currentTheme.bodyBgColor}
        />
      </StyledRhythmListAddRhythmButtonWrapper>
      <Modal isOpen={isOpen}>
        <AddRhythm
          onClick={handleCloseModal}
          rhythm={selectedRhythm}
          selectedDate={selectedDate}
        />
      </Modal>
    </>
  );
}

const StyledRhythmListAddRhythmButtonWrapper = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
`;
