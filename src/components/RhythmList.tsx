import React, { useState } from 'react';
import { getRhythm } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '../store/useUserStore';
import AddRhythm, { RhythmItem } from './AddRhythm';
import Loading from './ui/Loading';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';

export default function RhythmList() {
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
    <section id='RhythmList'>
      <div>
        <ButtonComponent onClick={handleOpenModal} text={'+'} />
        <StyledModalOverlay $isModalOpen={isModalOpen}>
          <StyledModalContent>
            <AddRhythm onClick={handleCloseModal} />
          </StyledModalContent>
        </StyledModalOverlay>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        Array.isArray(rhythm) && (
          <ul>
            {rhythm.map((item) => (
              <li key={item.id}>
                <p>{item.time}</p>
                <p>{item.title}</p>
                <p>{item.startDate}</p>
                <p>{item.endDate}</p>
                <p>{item.backgroundColor}</p>
                <p>{item.icon}</p>
                <p>{item.status}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}

const StyledModalOverlay = styled.div<{ $isModalOpen: boolean }>`
  display: ${({ $isModalOpen }) => ($isModalOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 27rem;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
