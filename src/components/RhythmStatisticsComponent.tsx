import React from 'react';
import styled from 'styled-components';
import Loading from '../components/ui/Loading';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType } from '../css/styles.theme';
import TodayRhythmStatistics from './TodayRhythmStatistics';
import RhythmStatisticsDetail from './RhythmStatisticsDetail';
import RhythmStatisticsBadge from './RhythmStatisticsBadge';
import { BREAKPOINTS } from '../css/styles.width';

export default function RhythmStatisticsComponent() {
  const { isLoading } = useRhythmStatistics();
  const currentTheme = useGetCurrentTheme();

  return (
    <StyledRhythmStatisticsWrapper $currentTheme={currentTheme}>
      {isLoading ? (
        <Loading />
      ) : (
        <StyledRhythmStatistics>
          <TodayRhythmStatistics />
          <div>
            <RhythmStatisticsDetail />
            <RhythmStatisticsBadge />
          </div>
        </StyledRhythmStatistics>
      )}
    </StyledRhythmStatisticsWrapper>
  );
}

const StyledRhythmStatisticsWrapper = styled.section<{
  $currentTheme?: ThemeType;
}>`
  color: ${({ $currentTheme }) => $currentTheme.textColor};
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    display: grid;
    justify-content: center;
    align-items: center;
    margin: 5rem 0rem;
    height: auto;
  }
`;

const StyledRhythmStatistics = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
`;
