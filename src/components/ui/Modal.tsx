import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <StyledModalOverlay $isModalOpen={isOpen} onClick={onClose}>
      <StyledModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </StyledModalContent>
    </StyledModalOverlay>
  );
}

const StyledModalOverlay = styled.div<{ $isModalOpen: boolean }>`
  display: ${({ $isModalOpen }) => ($isModalOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(230, 228, 228, 0.092);
  z-index: 1000;
`;

const StyledModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(102, 101, 101, 0.3);
  width: 80%;
  max-width: 27rem;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
