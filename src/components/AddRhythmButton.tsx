import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';
import { FaPlus } from 'react-icons/fa';
import Modal from './ui/Modal';
import AddRhythm from './AddRhythm';
import { RhythmItem } from './AddRhythm';

export default function AddRhythmButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRhythm, setSelectedRhythm] = useState<RhythmItem | null>(null);

  function handleOpenModal() {
    setSelectedRhythm(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedRhythm(null);
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
        />
      </StyledRhythmListAddRhythmButtonWrapper>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddRhythm onClick={handleCloseModal} rhythm={selectedRhythm} />
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
