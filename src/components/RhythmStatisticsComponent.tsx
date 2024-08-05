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
import UserCard from './UserCard';

export default function RhythmStatisticsComponent() {
  const { isLoading } = useRhythmStatistics();
  const currentTheme = useGetCurrentTheme();

  return (
    <StyledRhythmStatisticsWrapper $currentTheme={currentTheme}>
      {isLoading ? (
        <StyledRhythmLoadingBox>
          <Loading />
        </StyledRhythmLoadingBox>
      ) : (
        <>
          <StyledRhythmStatistics>
            <StyledRhythmStatisticsDetailBox>
              <UserCard />
              <RhythmStatisticsBadge />
            </StyledRhythmStatisticsDetailBox>
            <TodayRhythmStatistics />
          </StyledRhythmStatistics>
          <RhythmStatisticsDetail />
        </>
      )}
    </StyledRhythmStatisticsWrapper>
  );
}

const StyledRhythmStatisticsDetailBox = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-right: 3rem;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0rem;
    gap: 3rem;
  }
`;

const StyledRhythmStatisticsWrapper = styled.section<{
  $currentTheme?: ThemeType;
}>`
  color: ${({ $currentTheme }) => $currentTheme.textColor};
  margin-bottom: 2rem;
  height: auto;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    display: grid;
    justify-content: center;
    align-items: center;
    margin: 3rem 0rem;
    height: auto;
  }
`;

const StyledRhythmStatistics = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6rem 0rem 4rem 0rem;

  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0rem 1rem 0rem;
    gap: 4rem;
  }
`;
const StyledRhythmLoadingBox = styled.div`
  display: flex;
  height: 100vh;
`;
