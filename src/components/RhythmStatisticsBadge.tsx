import React from 'react';
import styled from 'styled-components';
import AnimatedCircularProgressbarComponent from './ui/AnimatedCircularProgressbarComponent';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType } from '../css/styles.theme';
import { StyledBaseBox } from './Navbar';
import badge10 from '../images/badge10.png';
import badge50 from '../images/badge50.png';
import badge100 from '../images/badge100.png';
import badge300 from '../images/badge300.png';
import badge500 from '../images/badge500.png';

const badges = [
  { count: 10, src: badge10, alt: 'badge10' },
  { count: 50, src: badge50, alt: 'badge50' },
  { count: 100, src: badge100, alt: 'badge100' },
  { count: 300, src: badge300, alt: 'badge300' },
  { count: 500, src: badge500, alt: 'badge500' },
];
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
          {badges.map((badge, index) =>
            totalDoneCount >= badge.count ? (
              <StyledRhythmStatisticsBadgeImg
                key={index}
                src={badge.src}
                alt={badge.alt}
              />
            ) : (
              <StyledRhythmStatisticsBadgeImgOpacity
                key={index}
                src={badge.src}
                alt={badge.alt}
              />
            )
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

const StyledRhythmStatisticsBadgeWrapper = styled(StyledBaseBox)<{
  $currentTheme: ThemeType;
}>`
  background-color: ${({ $currentTheme }) => $currentTheme.badgeBgColor};
  font-size: 1rem;
`;

const StyledRhythmStatisticsBadgeBox = styled(StyledBaseBox)<{
  $padding?: string;
}>`
  font-size: 1rem;
  padding-right: ${({ $padding }) => ($padding ? $padding : '0rem')};
`;
const StyledRhythmStatisticsBadgeTextBox = styled(StyledBaseBox)``;
const StyledRhythmStatisticsBadgeText = styled.p`
  font-weight: bold;
`;
const StyledRhythmStatisticsBadgeCount = styled.p<{
  $currentTheme: ThemeType;
}>`
  color: ${({ $currentTheme }) => $currentTheme.errorColor};
`;
const StyledRhythmStatisticsBadgeImgBox = styled.div`
  width: 23rem;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
`;
const StyledRhythmStatisticsBadgeImg = styled.img`
  width: 100%;
`;
const StyledRhythmStatisticsBadgeImgOpacity = styled.img`
  width: 100%;
  opacity: 0.5;
`;
