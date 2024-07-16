import React from 'react';
import styled from 'styled-components';
import AnimatedCircularProgressbarComponent from './ui/AnimatedCircularProgressbarComponent';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType } from '../css/styles.theme';
import badge10 from '../images/badge10.png';
import badge50 from '../images/badge50.png';
import badge100 from '../images/badge100.png';
import badge300 from '../images/badge300.png';
import badge500 from '../images/badge500.png';

export default function RhythmStatisticsBadge() {
  const { totalRhythmCount, totalDoneCount } = useRhythmStatistics();
  const currentTheme = useGetCurrentTheme();

  return (
    <div>
      <StyledRhythmStatisticsTitle>Rhythm Badge</StyledRhythmStatisticsTitle>
      <StyledRhythmStatisticsRightBadgeBox $currentTheme={currentTheme}>
        <StyledRhythmStatisticsBadgeTitle>
          지금까지 완료한 리듬의 수는 얼마나 될까요?
        </StyledRhythmStatisticsBadgeTitle>
        <StyledRhythmStatisticsBadgeWrapper $currentTheme={currentTheme}>
          <AnimatedCircularProgressbarComponent
            doneCountValue={totalDoneCount}
            totalValue={totalRhythmCount}
            width={'5rem'}
          />
          <StyledRhythmStatisticsBadgeTextBox>
            <StyledRhythmStatisticsBadgeBox $padding={'1rem'}>
              <StyledRhythmStatisticsBadgeText>
                Total: &nbsp;
              </StyledRhythmStatisticsBadgeText>
              <StyledRhythmStatisticsBadgeCount $currentTheme={currentTheme}>
                {totalRhythmCount}
              </StyledRhythmStatisticsBadgeCount>
            </StyledRhythmStatisticsBadgeBox>
            <StyledRhythmStatisticsBadgeBox>
              <StyledRhythmStatisticsBadgeText>
                Complete: &nbsp;
              </StyledRhythmStatisticsBadgeText>
              <StyledRhythmStatisticsBadgeCount $currentTheme={currentTheme}>
                {totalDoneCount}
              </StyledRhythmStatisticsBadgeCount>
            </StyledRhythmStatisticsBadgeBox>
          </StyledRhythmStatisticsBadgeTextBox>
        </StyledRhythmStatisticsBadgeWrapper>
        <StyledRhythmStatisticsBadgeImgBox>
          {totalDoneCount === 10 ? (
            <StyledRhythmStatisticsBadgeImg src={badge10} alt='badge10' />
          ) : (
            <StyledRhythmStatisticsBadgeImgOpacity
              src={badge10}
              alt='badge10'
            />
          )}
          {totalDoneCount === 50 ? (
            <StyledRhythmStatisticsBadgeImg src={badge50} alt='badge50' />
          ) : (
            <StyledRhythmStatisticsBadgeImgOpacity
              src={badge50}
              alt='badge50'
            />
          )}
          {totalDoneCount === 100 ? (
            <StyledRhythmStatisticsBadgeImg src={badge100} alt='badge100' />
          ) : (
            <StyledRhythmStatisticsBadgeImgOpacity
              src={badge100}
              alt='badge100'
            />
          )}
          {totalDoneCount === 300 ? (
            <StyledRhythmStatisticsBadgeImg src={badge300} alt='badge300' />
          ) : (
            <StyledRhythmStatisticsBadgeImgOpacity
              src={badge300}
              alt='badge300'
            />
          )}
          {totalDoneCount === 500 ? (
            <StyledRhythmStatisticsBadgeImg src={badge500} alt='badge500' />
          ) : (
            <StyledRhythmStatisticsBadgeImgOpacity
              src={badge500}
              alt='badge500'
            />
          )}
        </StyledRhythmStatisticsBadgeImgBox>
      </StyledRhythmStatisticsRightBadgeBox>
    </div>
  );
}

const StyledRhythmStatisticsRightBadgeBox = styled.div<{
  $currentTheme: ThemeType;
}>`
  background-color: ${({ $currentTheme }) => $currentTheme.statisbgColor};
  padding: 1.3rem 0rem;
  border-radius: 1rem;
  box-shadow: ${({ $currentTheme }) => $currentTheme.placeholderColor} 0px 3px
    8px;
`;

const StyledRhythmStatisticsTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledRhythmStatisticsBadgeTitle = styled.h2`
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0rem 0rem 1.1rem 1.2rem;
`;

const StyledRhythmStatisticsBadgeWrapper = styled.div<{
  $currentTheme: ThemeType;
}>`
  background-color: ${({ $currentTheme }) => $currentTheme.badgeBgColor};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRhythmStatisticsBadgeBox = styled.div<{
  $padding?: string;
}>`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${({ $padding }) => ($padding ? $padding : '0rem')};
`;
const StyledRhythmStatisticsBadgeTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledRhythmStatisticsBadgeText = styled.p`
  font-weight: bold;
`;
const StyledRhythmStatisticsBadgeCount = styled.p<{
  $currentTheme: ThemeType;
}>`
  color: ${({ $currentTheme }) => $currentTheme.errorColor};
`;
const StyledRhythmStatisticsBadgeImgBox = styled.div`
  width: 21rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const StyledRhythmStatisticsBadgeImg = styled.img`
  width: 100%;
`;
const StyledRhythmStatisticsBadgeImgOpacity = styled.img`
  width: 100%;
  opacity: 0.5;
`;
