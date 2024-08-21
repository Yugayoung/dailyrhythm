import React, { useState } from 'react';
import styled from 'styled-components';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType, color, lightTheme } from '../css/styles.theme';
import LinearProgressBar from './ui/LinearProgressBar';
import ButtonComponent from './ui/ButtonComponent';
import { FaPen, FaPlus } from 'react-icons/fa';
import RhythmExpandedTable from './RhythmExpandedTable';
import { useGetUser } from '../store/useUserStore';
import dayjs from 'dayjs';
import { useModal } from '../hooks/useModal';
import AddRhythm, { RhythmItem } from './AddRhythm';
import Modal from './ui/Modal';
import { StyledBaseBox } from './Navbar';
import { BREAKPOINTS } from '../css/styles.width';
import { useWindowSize } from '../hooks/useWindowSize';
import handImg from '../images/handImg.png';
import { Link } from 'react-router-dom';

export default function RhythmStatisticsDetail() {
  const { rhythmDetails } = useRhythmStatistics();
  const currentTheme = useGetCurrentTheme();
  const [expandedRhythm, setExpandedRhythm] = useState<string>(null);
  const user = useGetUser();
  const uid = user.uid;
  const formatDate = (date: string) => dayjs(date).format('YYYY.MM.DD');
  const ShortedFormatDate = (date: string) => dayjs(date).format('YY.MM.DD');
  const windowSize = useWindowSize();
  const isSmallWindow = windowSize.width < parseInt(BREAKPOINTS.smallDesktop);
  const handleExpandClick = (id: string) => {
    setExpandedRhythm((prev) => (prev === id ? null : id));
  };
  const [selectedRhythm, setSelectedRhythm] = useState(null);
  const { isOpen, closeModal, openModal } = useModal();

  const handleEditClick = (rhythm: RhythmItem) => {
    setSelectedRhythm(rhythm);
    openModal();
  };
  function handleCloseModal() {
    closeModal();
    setSelectedRhythm(null);
  }

  return (
    <StyledRhythmStatisticsSection>
      <StyledRhythmStatisticsTitle>Rhythm Detail</StyledRhythmStatisticsTitle>
      <StyledRhythmStatisticsRightBox
        $currentTheme={currentTheme}
        $isMargin={true}
      >
        {rhythmDetails && rhythmDetails.length > 0 ? (
          <>
            <StyledRhythmStatisticsHeadBox>
              <StyledRhythmStatisticsText className='size_x-small'></StyledRhythmStatisticsText>
              <StyledRhythmStatisticsText className='size_medium header_size'>
                Title
              </StyledRhythmStatisticsText>
              <StyledRhythmStatisticsText className='size_small header_size'>
                Time
              </StyledRhythmStatisticsText>
              <StyledRhythmStatisticsText className='size_large header_size'>
                Period
              </StyledRhythmStatisticsText>
              <StyledRhythmStatisticsText className='size_medium header_size'>
                Progress
              </StyledRhythmStatisticsText>
              <StyledRhythmStatisticsText className='size_blank'></StyledRhythmStatisticsText>
              <StyledRhythmStatisticsText className='size_blank'></StyledRhythmStatisticsText>
            </StyledRhythmStatisticsHeadBox>
            <StyledRhythmStatisticsUl>
              {rhythmDetails.map((item) => (
                <StyledRhythmStatisticsLi key={item.id}>
                  <StyledRhythmStatisticsDetailBox>
                    <StyledRhythmStatisticsText className='size_x-small'>
                      {item.icon}
                    </StyledRhythmStatisticsText>
                    <StyledRhythmStatisticsText className='size_medium'>
                      {item.title}
                    </StyledRhythmStatisticsText>
                    <StyledRhythmStatisticsText className='size_small'>
                      {item.time}
                    </StyledRhythmStatisticsText>
                    <StyledRhythmStatisticsText className='size_large period_size'>
                      {isSmallWindow
                        ? `${ShortedFormatDate(
                            item.startDate
                          )} ~ ${ShortedFormatDate(item.endDate)}`
                        : `${formatDate(item.startDate)} ~ ${formatDate(
                            item.endDate
                          )}`}
                    </StyledRhythmStatisticsText>

                    <StyledRhythmStatisticsText className='size_medium'>
                      <LinearProgressBar
                        totalCount={item.totalCount}
                        doneCount={item.doneCount}
                      />
                    </StyledRhythmStatisticsText>
                    <StyledRhythmStatisticsText className='size_x-small'>
                      <ButtonComponent
                        onClick={() => handleExpandClick(item.id)}
                        text={<FaPlus />}
                        textColor={lightTheme.textColor}
                        backgroundColor={'transparent'}
                        className='focusEffect'
                      />
                    </StyledRhythmStatisticsText>
                    <StyledRhythmStatisticsText className='size_x-small'>
                      <ButtonComponent
                        onClick={() => handleEditClick(item)}
                        text={<FaPen />}
                        textColor={lightTheme.textColor}
                        backgroundColor={'transparent'}
                      />
                    </StyledRhythmStatisticsText>
                  </StyledRhythmStatisticsDetailBox>
                  {expandedRhythm === item.id && (
                    <RhythmExpandedTableBox>
                      <RhythmExpandedTable
                        rhythmId={expandedRhythm}
                        uid={uid}
                      />
                    </RhythmExpandedTableBox>
                  )}
                </StyledRhythmStatisticsLi>
              ))}
            </StyledRhythmStatisticsUl>
          </>
        ) : (
          <StyledRhythmStatisticsImgBox>
            <StyledRhythmStatisticsImgText>
              리듬을 추가한 후 이용가능합니다.
            </StyledRhythmStatisticsImgText>
            <StyledRhythmStatisticsImg src={handImg} alt='handImg' />
            <StyledRhythmStatisticsImgButtonBox>
              <StyledLink to='/my-rhythm'>
                <FaPlus />
              </StyledLink>
            </StyledRhythmStatisticsImgButtonBox>
          </StyledRhythmStatisticsImgBox>
        )}
      </StyledRhythmStatisticsRightBox>
      {selectedRhythm && (
        <Modal isOpen={isOpen}>
          <AddRhythm onClick={handleCloseModal} rhythm={selectedRhythm} />
        </Modal>
      )}
    </StyledRhythmStatisticsSection>
  );
}

const StyledRhythmStatisticsImgButtonBox = styled(StyledBaseBox)`
  position: absolute;
  top: 53.6%;
  left: 49.4%;
  transform: translate(-50%, -50%);
  height: 4.9rem;
  width: 4.9rem;
  border-radius: 100%;
  background-color: #fe8d68;
  font-size: 3rem;
  transition: 200ms;
  &:hover {
    background-color: #f6764c;
  }
`;
const StyledRhythmStatisticsImgBox = styled(StyledBaseBox)`
  flex-direction: column;
  width: 100%;
  position: relative;
`;
const StyledLink = styled(Link)`
  padding: 2rem 0rem;
  font-weight: bold;
  color: white;
`;
const StyledRhythmStatisticsImgText = styled.p`
  padding: 2rem 0rem;
  font-weight: bold;
`;
const StyledRhythmStatisticsImg = styled.img`
  width: 24rem;
`;
const StyledRhythmStatisticsUl = styled.ul`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  background-color: ${color.lightGray3};
  overflow-y: scroll;
  height: 400px;
`;

const StyledRhythmStatisticsRightBox = styled.div<{
  $isMargin?: boolean;
  $currentTheme: ThemeType;
}>`
  margin-bottom: ${({ $isMargin }) => ($isMargin ? '2rem' : '0rem')};
  background-color: ${lightTheme.statisbgColor};
  padding: 1.3rem 1.3rem 3rem 1.3rem;
  border-radius: 1rem;
  box-shadow: ${({ $currentTheme }) => $currentTheme.placeholderColor} 0px 3px
    8px;
  color: ${lightTheme.textColor};
  width: 95%;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    width: 85%;
  }
`;

const RhythmExpandedTableBox = styled.div`
  width: 100%;
  background-color: white;
`;
const StyledRhythmStatisticsTitle = styled.h2`
  text-align: start;
  font-weight: bold;
  margin-bottom: 1rem;
  width: 100%;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    padding-left: 3rem;
  }
`;

const StyledRhythmStatisticsSection = styled.section`
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const StyledRhythmStatisticsHeadBox = styled(StyledBaseBox)`
  font-weight: bold;
  width: 100%;
`;
const StyledRhythmStatisticsDetailBox = styled(StyledBaseBox)`
  width: 100%;
`;

const StyledRhythmStatisticsLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledRhythmStatisticsText = styled(StyledBaseBox)`
  border: 2px solid ${lightTheme.bgColor};
  text-align: center;
  height: 2rem;
  font-size: 0.9rem;
  padding: 0.3rem 0rem;
  &.border {
    border: 1rem solid ${lightTheme.bgColor};
  }

  &.period_size {
    @media (max-width: ${BREAKPOINTS.smallDesktop}) {
      font-size: 0.8rem;
    }
    @media (max-width: ${BREAKPOINTS.mobile}) {
      font-size: 0.6rem;
    }
  }
  &.header_size {
    font-size: 1rem;
    @media (max-width: ${BREAKPOINTS.smallDesktop}) {
      font-size: 0.9rem;
    }
  }

  &.size_blank {
    width: 7%;
    @media (max-width: ${BREAKPOINTS.smallDesktop}) {
      width: 7.5%;
    }
    @media (max-width: ${BREAKPOINTS.mobile}) {
      width: 6.8%;
    }
  }
  &.size_x-small {
    width: 7%;
    @media (max-width: ${BREAKPOINTS.mobile}) {
      width: 6%;
    }
  }
  &.size_small {
    width: 10%;
  }
  &.size_medium {
    width: 20%;
  }
  &.size_large {
    width: 29%;
  }
`;
