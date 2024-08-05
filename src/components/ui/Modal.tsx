import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../css/styles.width';
import { lightTheme } from '../../css/styles.theme';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children }: ModalProps) {
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <StyledModalOverlay $isModalOpen={isOpen}>
      <StyledModalContent onClick={handleContentClick}>
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
  background-color: rgba(255, 254, 254, 0.487);
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
  color: ${lightTheme.textColor};

  @media (min-width: ${BREAKPOINTS.smallDesktop}) {
    width: 50%;
  }
`;
