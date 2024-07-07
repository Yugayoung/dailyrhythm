import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getRhythm } from '../api/firebase';
import { useGetUser } from '../store/useUserStore';
import dayjs from 'dayjs';
import { RhythmItem } from './AddRhythm';
import { color, darkTheme, lightTheme } from '../css/styles.theme';
import Loading from './ui/Loading';

interface CalendarComponentProps {
  onDateChange: (date: Date) => void;
}

export default function CalendarComponent({
  onDateChange,
}: CalendarComponentProps) {
  const [date, setDate] = useState(new Date());
  const user = useGetUser();
  const uid = user.uid;

  const { data: rhythms, isLoading } = useQuery<RhythmItem[]>({
    queryKey: ['rhythms', uid],
    queryFn: () => getRhythm(uid),
  });

  function handleChange(nextDate: Date) {
    setDate(nextDate);
    onDateChange(nextDate);
  }

  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view === 'month' && rhythms) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const todayRhythms = rhythms.filter(
        (rhythm) =>
          dayjs(rhythm.startDate).format('YYYY-MM-DD') <= formattedDate &&
          dayjs(rhythm.endDate).format('YYYY-MM-DD') >= formattedDate
      );
      return <div>{todayRhythms.length > 0 && <Dot />}</div>;
    }
  }

  return (
    <StyledCalendarContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <Calendar
          onChange={handleChange}
          value={date}
          tileContent={tileContent}
        />
      )}
    </StyledCalendarContainer>
  );
}

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${lightTheme.primaryColor};
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 0.3rem;
`;

const StyledCalendarContainer = styled.div`
  width: 100%;
  .react-calendar {
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 8px;
    border: none;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    font-family: 'MoveSansLight';
    line-height: 1rem;
  }
  .react-calendar__tile {
    border-radius: 0.5rem;
  }
  .react-calendar__tile--active {
    background: ${color.lightGray};
    color: ${darkTheme.supportingColor};
  }
`;
