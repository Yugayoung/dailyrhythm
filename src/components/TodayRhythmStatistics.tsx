import React from 'react';
import styled from 'styled-components';
import AnimatedCircularProgressbarComponent from './ui/AnimatedCircularProgressbarComponent';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import dayjs from 'dayjs';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType, lightTheme } from '../css/styles.theme';
import goalImg from '../images/goalImg.png';

export default function TodayRhythmStatistics() {
  const { todayRhythmCount, todayDoneCount } = useRhythmStatistics();
  const formattedToday = dayjs().format('MM.DD');
  const currentTheme = useGetCurrentTheme();

  return (
    <>
      <StyledRhythmStatisticsLeftBox $currentTheme={currentTheme}>
        <StyledRhythmStatisticsLeftTitle>
          오늘({formattedToday})의 달성률
        </StyledRhythmStatisticsLeftTitle>
        <AnimatedCircularProgressbarComponent
          doneCountValue={todayDoneCount}
          totalValue={todayRhythmCount}
        />
        <StyledRhythmStatisticsGoalImg src={goalImg} alt='goalImg' />
        <StyledRhythmStatisticsLeftTodayCountBox $currentTheme={currentTheme}>
          <StyledRhythmStatisticsLeftTodayTotalCountBox $isBorder={true}>
            <StyledRhythmStatisticsLeftTotalCountTitle>
              Total
            </StyledRhythmStatisticsLeftTotalCountTitle>
            <p>{todayRhythmCount} 개</p>
          </StyledRhythmStatisticsLeftTodayTotalCountBox>
          <StyledRhythmStatisticsLeftTodayTotalCountBox $isBorder={false}>
            <StyledRhythmStatisticsLeftTotalCountTitle>
              Complete
            </StyledRhythmStatisticsLeftTotalCountTitle>
            <p>{todayDoneCount} 개</p>
          </StyledRhythmStatisticsLeftTodayTotalCountBox>
        </StyledRhythmStatisticsLeftTodayCountBox>
      </StyledRhythmStatisticsLeftBox>
    </>
  );
}

const StyledRhythmStatisticsLeftBox = styled.div<{
  $currentTheme: ThemeType;
}>`
  width: 20rem;

  height: 39.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 2.3rem 3rem 0rem 0rem;
  border-radius: 1rem;
  background-color: ${({ $currentTheme }) => $currentTheme.statisbgColor};
  box-shadow: ${lightTheme.placeholderColor} 0px 3px 8px;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0rem 0rem 3rem 0rem;
    height: 35rem;
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
const StyledRhythmStatisticsLeftTodayCountBox = styled.div<{
  $currentTheme: ThemeType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top: 2px solid ${lightTheme.placeholderColor};
`;
const StyledRhythmStatisticsLeftTodayTotalCountBox = styled.div<{
  $isBorder: boolean;
}>`
  flex: 1;
  padding: 0.7rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: ${({ $isBorder }) =>
    $isBorder ? `2px solid ${lightTheme.placeholderColor}` : 'none'};
`;
const StyledRhythmStatisticsLeftTotalCountTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
