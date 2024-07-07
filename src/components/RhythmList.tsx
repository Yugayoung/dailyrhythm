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
import dayjs from 'dayjs';
import GuideImage from '../images/GuideImage.png';

interface RhythmListProps {
  selectedDate: Date;
}

export default function RhythmList({ selectedDate }: RhythmListProps) {
  const currentTheme = useGetCurrentTheme();
  const user = useGetUser();
  const uid = user.uid;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
  const formattedDateTitle = dayjs(selectedDate).format('YYYY년 MM월 DD일');

  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const { data: rhythms, isLoading } = useQuery<RhythmItem[]>({
    queryKey: ['rhythms', uid],
    queryFn: () => getRhythm(uid),
  });

  const filteredRhythms = rhythms?.filter((rhythm) => {
    return (
      dayjs(rhythm.startDate).format('YYYY-MM-DD') <= formattedDate &&
      dayjs(rhythm.endDate).format('YYYY-MM-DD') >= formattedDate
    );
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
          <StyledRhythmTable>
            <thead>
              <tr>
                <td colSpan={3}>
                  <StyledRhythmListTitle>
                    {formattedDateTitle}의 리듬
                  </StyledRhythmListTitle>
                </td>
              </tr>
            </thead>
            {filteredRhythms && filteredRhythms.length > 0 ? (
              <tbody>
                {filteredRhythms.map((item) => (
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
            ) : (
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <StyledRhythmListMessageWrapper>
                      나만의
                      <StyledRhythmListMessage>
                        &nbsp;"리듬"
                      </StyledRhythmListMessage>
                      을 만들어 볼까요?
                    </StyledRhythmListMessageWrapper>
                    <StyledRhythmImg src={GuideImage} alt='guideImage' />
                  </td>
                </tr>
              </tbody>
            )}
          </StyledRhythmTable>
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
  border-top: 1px solid ${lightTheme.secondaryColor};
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
  border-left: 2px solid ${lightTheme.bgColor};
  border-right: 2px solid ${lightTheme.bgColor};
  padding: 0.8rem;
`;
const StyledRhythmListHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledRhythmImg = styled.img`
  width: 100%;
`;
const StyledRhythmListTitle = styled.p`
  margin: 1.3rem 0rem 1rem 0rem;
  text-align: left;
  font-size: 1.1rem;
`;
const StyledRhythmListMessage = styled.p`
  color: ${lightTheme.errorColor};
`;
const StyledRhythmListMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
