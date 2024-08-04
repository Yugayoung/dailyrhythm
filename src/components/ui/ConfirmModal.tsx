import React from 'react';
import ButtonComponent from './ButtonComponent';
import { lightTheme } from '../../css/styles.theme';
import styled from 'styled-components';

interface ConfirmModalProps {
  message?: React.ReactNode;
  onClose: () => void;
  onClick: () => void;
}

export default function ConfirmModal({
  message = '이 작업을 진행하시겠습니까?',
  onClose,
  onClick,
}: ConfirmModalProps) {
  return (
    <StyledConfirmModalBox>
      <h2>{message}</h2>
      <StyledConfirmModalButton>
        <ButtonComponent
          onClick={onClick}
          width={'6rem'}
          hoverTextColor={lightTheme.errorColor}
        />
        <ButtonComponent
          onClick={onClose}
          text={'취소'}
          width={'6rem'}
          hoverTextColor={lightTheme.errorColor}
        />
      </StyledConfirmModalButton>
    </StyledConfirmModalBox>
  );
}

const StyledConfirmModalBox = styled.div`
  display: gird;
  justify-content: space-between;
  align-items: center;
  font-family: 'GmarketSansMedium';
  padding: 1rem;
  gap: 1rem;
  text-align: center;
`;
const StyledConfirmModalButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;
