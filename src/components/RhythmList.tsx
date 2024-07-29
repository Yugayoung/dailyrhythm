import React, { useState } from 'react';
import { getRhythm } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '../store/useUserStore';
import AddRhythm, { RhythmItem } from './AddRhythm';
import Loading from './ui/Loading';
import styled from 'styled-components';

import { color, lightTheme } from '../css/styles.theme';
import Weather from './Weather';
import Modal from './ui/Modal';
import dayjs from 'dayjs';
import GuideImage from '../images/GuideImage.png';
import AddRhythmButton from './AddRhythmButton';
import { useRhythm } from '../hooks/useRhythm';
import { StyledBaseBox } from './Navbar';
import { BREAKPOINTS } from '../css/styles.width';

interface RhythmListProps {
  selectedDate: Date;
}

export default function RhythmList({ selectedDate }: RhythmListProps) {
  const user = useGetUser();
  const uid = user.uid;
  const [selectedRhythm, setSelectedRhythm] = useState<RhythmItem | null>(null);
  const { updateRhythm } = useRhythm(uid);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
  const year = dayjs(selectedDate).format('YYYY');
  const month = dayjs(selectedDate).format('MMM');
  const day = dayjs(selectedDate).format('DD');

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedRhythm(null);
  }
  function handleRhythmItemClick(rhythm: RhythmItem) {
    setSelectedRhythm(rhythm);
    setIsModalOpen(true);
  }

  const { data: rhythms, isLoading } = useQuery<RhythmItem[]>({
    queryKey: ['rhythms', uid],
    queryFn: () => getRhythm(uid),
  });

  function handleUpdateRhythmStatus(rhythm: RhythmItem, date: string) {
    const newStatus = rhythm.status[date] === 'active' ? 'done' : 'active';
    const updatedRhythm = {
      ...rhythm,
      status: {
        ...rhythm.status,
        [date]: newStatus,
      },
    };

    updateRhythm.mutate({
      uid,
      rhythm: updatedRhythm,
    });
  }

  const filteredRhythms = rhythms?.filter((rhythm) => {
    return (
      dayjs(rhythm.startDate).format('YYYY-MM-DD') <= formattedDate &&
      dayjs(rhythm.endDate).format('YYYY-MM-DD') >= formattedDate
    );
  });

  const sortedRhythms = filteredRhythms?.sort((a, b) => {
    if (a.time === '' && b.time !== '') return 1;
    if (a.time !== '' && b.time === '') return -1;
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  });

  return (
    <StyledRhythmList>
      <StyledRhythmListHead>
        <StyledRhythmListDateWrapper>
          <StyledRhythmListDay>{day}</StyledRhythmListDay>
          <StyledRhythmListYearMonthWrapper>
            <StyledRhythmListMonth>{month.toUpperCase()}</StyledRhythmListMonth>
            <StyledRhythmListYear>{year}</StyledRhythmListYear>
          </StyledRhythmListYearMonthWrapper>
        </StyledRhythmListDateWrapper>
        <Weather />
      </StyledRhythmListHead>
      <StyledRhythmTableBox>
        {isLoading ? (
          <Loading />
        ) : (
          <StyledRhythmTable>
            {sortedRhythms && sortedRhythms.length > 0 ? (
              <tbody>
                {sortedRhythms.map((item) => (
                  <StyledRhythmTableTr
                    key={item.id}
                    $background={item.backgroundColor}
                  >
                    <StyledRhythmListTime>{item.time}</StyledRhythmListTime>
                    <StyledRhythmTableTdTitle>
                      <StyledRhythmListTitleButton
                        onClick={() => handleRhythmItemClick(item)}
                        $status={item.status[formattedDate]}
                      >
                        <p>{item.title}</p>
                      </StyledRhythmListTitleButton>
                    </StyledRhythmTableTdTitle>
                    <StyledRhythmListIcon>
                      <StyledRhythmListCircleButton
                        onClick={() =>
                          handleUpdateRhythmStatus(item, formattedDate)
                        }
                      >
                        <p>
                          {item.status[formattedDate] === 'active'
                            ? ''
                            : item.icon}
                        </p>
                      </StyledRhythmListCircleButton>
                    </StyledRhythmListIcon>
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
      <AddRhythmButton />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddRhythm onClick={handleCloseModal} rhythm={selectedRhythm} />
      </Modal>
    </StyledRhythmList>
  );
}

const StyledRhythmList = styled.section`
  width: 25rem;
  height: 24.2rem;
  background-color: ${color.lightGray3};
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  padding: 1.5rem 1rem;
  font-weight: bold;
  position: relative;
  @media (min-width: ${BREAKPOINTS.smallDesktop}) {
    width: 28rem;
    border-left: 2px solid ${color.borderColor};
  }
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    margin-bottom: 5rem;
    border-top: 2px solid ${color.borderColor};
  }
`;
const StyledRhythmTable = styled.table`
  text-align: center;
  width: 100%;
  font-size: 1rem;
`;
const StyledRhythmTableBox = styled.div`
  height: 300px;
  overflow-y: scroll;
  margin: 1rem 0rem;
`;
const StyledRhythmTableTr = styled.tr<{ $background: string }>`
  background-color: ${({ $background }) =>
    $background ? $background : 'white'};
  height: 3rem;
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
const StyledRhythmListMessage = styled.p`
  color: ${lightTheme.errorColor};
`;
const StyledRhythmListMessageWrapper = styled(StyledBaseBox)``;
const StyledRhythmListDateWrapper = styled(StyledBaseBox)`
  padding: 0.5rem;
`;
const StyledRhythmListYearMonthWrapper = styled.div`
  margin-left: 0.3rem;
  display: grid;
  justify-content: space-between;
`;
const StyledRhythmListDay = styled.p`
  font-size: 1.9rem;
`;
const StyledRhythmListYear = styled.p`
  font-size: 0.8rem;
  opacity: 0.2;
`;
const StyledRhythmListMonth = styled.p`
  font-size: 0.8rem;
  opacity: 0.6;
`;
const StyledRhythmListTime = styled.td`
  width: 15%;
  font-size: 0.8rem;
  font-family: 'GmarketSansLight';
  text-align: center;
  vertical-align: middle;
`;
const StyledRhythmListIcon = styled.td`
  width: 15%;
  height: 3rem;
  position: relative;
`;
const StyledRhythmListTitleButton = styled.button<{ $status: string }>`
  width: 100%;
  font-size: 1.1rem;
  font-family: 'GmarketSansLight';
  border: none;
  background-color: transparent;
  text-align: center;
  text-decoration: ${({ $status }) =>
    $status === 'done' ? 'line-through' : 'none'};
`;
const StyledRhythmListCircleButton = styled.button`
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.2rem;
  border-radius: 100%;
  text-align: center;
  border: none;
  background-color: ${color.lightGray3};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
