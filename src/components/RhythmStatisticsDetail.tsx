import React from 'react';
import styled from 'styled-components';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType } from '../css/styles.theme';

export default function RhythmStatisticsDetail() {
  const { rhythmDetails } = useRhythmStatistics();

  const currentTheme = useGetCurrentTheme();

  return (
    <div>
      <StyledRhythmStatisticsTitle>Rhythm Detail</StyledRhythmStatisticsTitle>
      <StyledRhythmStatisticsRightBox
        $currentTheme={currentTheme}
        $isMargin={true}
      >
        <StyledRhythmStatisticsDetailHeadBox $currentTheme={currentTheme}>
          <StyledRhythmStatisticsDetailHeadTitle $padding={'6rem'}>
            Title
          </StyledRhythmStatisticsDetailHeadTitle>
          <StyledRhythmStatisticsDetailHeadTitle $padding={'3rem'}>
            Done
          </StyledRhythmStatisticsDetailHeadTitle>
          <p>Total</p>
        </StyledRhythmStatisticsDetailHeadBox>
        <StyledRhythmStatisticsDetailUl>
          {rhythmDetails.map((rhythm) => (
            <StyledRhythmStatisticsDetailLi key={rhythm.id}>
              <StyledRhythmStatisticsDetailText>
                {rhythm.icon}
              </StyledRhythmStatisticsDetailText>
              <StyledRhythmStatisticsDetailText $width={'50%'}>
                {rhythm.title}
              </StyledRhythmStatisticsDetailText>
              <StyledRhythmStatisticsDetailText $width={'25%'}>
                {rhythm.doneCount}
              </StyledRhythmStatisticsDetailText>
              <StyledRhythmStatisticsDetailText $width={'15%'}>
                {rhythm.totalCount}
              </StyledRhythmStatisticsDetailText>
            </StyledRhythmStatisticsDetailLi>
          ))}
        </StyledRhythmStatisticsDetailUl>
      </StyledRhythmStatisticsRightBox>
    </div>
  );
}

const StyledRhythmStatisticsRightBox = styled.div<{
  $isMargin?: boolean;
  $currentTheme: ThemeType;
}>`
  margin-bottom: ${({ $isMargin }) => ($isMargin ? '2rem' : '0rem')};
  background-color: ${({ $currentTheme }) => $currentTheme.statisbgColor};
  padding: 1.3rem;
  border-radius: 1rem;
  box-shadow: ${({ $currentTheme }) => $currentTheme.placeholderColor} 0px 3px
    8px;
`;
const StyledRhythmStatisticsTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledRhythmStatisticsDetailHeadBox = styled.div<{
  $currentTheme: ThemeType;
}>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid
    ${({ $currentTheme }) => $currentTheme.placeholderColor};
`;
const StyledRhythmStatisticsDetailHeadTitle = styled.p<{
  $padding?: string;
}>`
  padding-left: ${({ $padding }) => ($padding ? $padding : '0rem')};
`;
const StyledRhythmStatisticsDetailUl = styled.ul`
  max-height: 100px;
  overflow-y: scroll;
  display: block;
  margin-top: 1rem;
`;

const StyledRhythmStatisticsDetailLi = styled.li`
  display: flex;
  font-size: 1rem;
  padding: 0.3rem;
  text-align: center;
  width: 100%;
  height: 2rem;
  font-weight: bold;
`;

const StyledRhythmStatisticsDetailText = styled.p<{
  $width?: string;
}>`
  width: ${({ $width }) => ($width ? $width : '10%')};
`;
