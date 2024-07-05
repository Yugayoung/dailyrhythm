import React, { useState } from 'react';
import { getRhythm } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '../store/useUserStore';
import AddRhythm, { RhythmItem } from './AddRhythm';
import Loading from './ui/Loading';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';
import { FaPlus } from 'react-icons/fa';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { lightTheme } from '../css/styles.theme';
import Weather from './Weather';
import Modal from './ui/Modal';

export default function RhythmList() {
  const currentTheme = useGetCurrentTheme();
  const user = useGetUser();
  const uid = user.uid;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const { data: rhythm, isLoading } = useQuery<RhythmItem[]>({
    queryKey: ['rhythms', uid],
    queryFn: () => getRhythm(uid),
  });

  return (
    <StyledRhythmList>
      <StyledRhythmListHead>
        <Weather />
        <div>
          <ButtonComponent
            onClick={handleOpenModal}
            text={<FaPlus />}
            backgroundColor={'transparent'}
            textSize={'1.8rem'}
            textColor={currentTheme.primaryColor}
          />
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <AddRhythm onClick={handleCloseModal} />
          </Modal>
        </div>
      </StyledRhythmListHead>
      <StyledRhythmTableBox>
        {isLoading ? (
          <Loading />
        ) : (
          Array.isArray(rhythm) && (
            <StyledRhythmTable>
              <tbody>
                {rhythm.map((item) => (
                  <StyledRhythmTableTr
                    key={item.id}
                    $background={item.backgroundColor}
                  >
                    <StyledRhythmTableTd>{item.time}</StyledRhythmTableTd>
                    <StyledRhythmTableTdTitle>
                      {item.title}
                    </StyledRhythmTableTdTitle>
                    <StyledRhythmTableTd>{item.icon}</StyledRhythmTableTd>
                  </StyledRhythmTableTr>
                ))}
              </tbody>
            </StyledRhythmTable>
          )
        )}
      </StyledRhythmTableBox>
    </StyledRhythmList>
  );
}

const StyledRhythmList = styled.section`
  width: 25rem;
  background-color: white;
  padding: 1.5rem 1rem;
  border-radius: 1.5rem;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  font-weight: bold;
  @media (min-width: 768px) {
    width: 30rem;
  }
`;
const StyledRhythmTable = styled.table`
  text-align: center;
  width: 100%;
  font-size: 1rem;
  margin-top: 1rem;
`;
const StyledRhythmTableBox = styled.div`
  height: 300px;
  overflow-y: scroll;
`;

const StyledRhythmTableTr = styled.tr<{ $background: string }>`
  background-color: ${({ $background }) =>
    $background ? $background : 'white'};
`;
const StyledRhythmTableTd = styled.td`
  padding: 0.8rem;
`;
const StyledRhythmTableTdTitle = styled.td`
  width: 70%;
  border-left: 2px solid ${lightTheme.textColor};
  border-right: 2px solid ${lightTheme.textColor};
  padding: 0.8rem;
`;
const StyledRhythmListHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
