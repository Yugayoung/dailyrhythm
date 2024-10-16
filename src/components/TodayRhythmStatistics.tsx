import React from 'react';
import styled from 'styled-components';
import AnimatedCircularProgressbarComponent from './ui/AnimatedCircularProgressbarComponent';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import dayjs from 'dayjs';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType, lightTheme } from '../css/styles.theme';
import goalImg from '../images/goalImg.png';
import { StyledBaseBox } from './Navbar';
import { BREAKPOINTS } from '../css/styles.width';

export default function TodayRhythmStatistics() {
  const { todayRhythmCount, todayDoneCount } = useRhythmStatistics();
  const formattedToday = dayjs().format('MM.DD');
  const currentTheme = useGetCurrentTheme();

  return (
    <StyledTodayRhythmStatisticsSection>
      <StyledTitle>Rhythm Badge</StyledTitle>
      <StyledRhythmStatisticsLeftBox $currentTheme={currentTheme}>
        <StyledRhythmStatisticsLeftTitle>
          오늘({formattedToday})의 달성률
        </StyledRhythmStatisticsLeftTitle>
        <AnimatedCircularProgressbarComponent
          doneCountValue={todayDoneCount}
          totalValue={todayRhythmCount}
        />
        <StyledRhythmStatisticsGoalImg
          src={goalImg}
          alt='goalImg'
          loading='lazy'
        />
        <StyledRhythmStatisticsLeftTodayCountBox $currentTheme={currentTheme}>
          <StyledRhythmStatisticsLeftTodayTotalCountBox className='with-border'>
            <StyledRhythmStatisticsLeftTotalCountTitle>
              Total
            </StyledRhythmStatisticsLeftTotalCountTitle>
            <p>{todayRhythmCount} 개</p>
          </StyledRhythmStatisticsLeftTodayTotalCountBox>
          <StyledRhythmStatisticsLeftTodayTotalCountBox className='without-border'>
            <StyledRhythmStatisticsLeftTotalCountTitle>
              Complete
            </StyledRhythmStatisticsLeftTotalCountTitle>
            <p>{todayDoneCount} 개</p>
          </StyledRhythmStatisticsLeftTodayTotalCountBox>
        </StyledRhythmStatisticsLeftTodayCountBox>
      </StyledRhythmStatisticsLeftBox>
    </StyledTodayRhythmStatisticsSection>
  );
}

const StyledRhythmStatisticsLeftBox = styled.div<{
  $currentTheme: ThemeType;
}>`
  width: 21rem;
  height: 42.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ $currentTheme }) => $currentTheme.statisbgColor};
  box-shadow: ${lightTheme.placeholderColor} 0px 3px 8px;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    justify-content: center;
    width: 85%;
    height: auto;
    margin-bottom: 3rem;
  }
`;
export const StyledTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
  width: 100%;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    padding-left: 3.4rem;
  }
`;
const StyledRhythmStatisticsGoalImg = styled.img`
  margin: 1rem 0rem;
  width: 80%;
`;
const StyledRhythmStatisticsLeftTitle = styled.h2`
  padding-bottom: 1rem;
  margin: 1rem 0rem;
  font-size: 1.3rem;
  font-weight: bold;
`;
const StyledRhythmStatisticsLeftTodayTotalCountBox = styled.div`
  flex: 1;
  padding: 0.7rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.with-border {
    border-right: 2px solid ${lightTheme.placeholderColor};
  }

  &.without-border {
    border-right: none;
  }
`;
const StyledRhythmStatisticsLeftTotalCountTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const StyledTodayRhythmStatisticsSection = styled.section`
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const StyledRhythmStatisticsLeftTodayCountBox = styled(StyledBaseBox)<{
  $currentTheme: ThemeType;
}>`
  width: 100%;
  border-top: 2px solid ${lightTheme.placeholderColor};
`;
