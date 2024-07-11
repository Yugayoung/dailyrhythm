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
import ButtonComponent from './ui/ButtonComponent';

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

  function handleTodayChange() {
    const today = new Date();
    setDate(today);
    onDateChange(today);
  }

  function isCalendarItem({ date, view }: { date: Date; view: string }) {
    if (view === 'month' && rhythms) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const todayRhythms = rhythms.filter(
        (rhythm) =>
          dayjs(rhythm.startDate).format('YYYY-MM-DD') <= formattedDate &&
          dayjs(rhythm.endDate).format('YYYY-MM-DD') >= formattedDate
      );

      return (
        <div>
          {todayRhythms.length > 0 ? (
            <StyledDotWrapper>
              <StyledDot />
            </StyledDotWrapper>
          ) : (
            <StyledDotWrapper></StyledDotWrapper>
          )}
        </div>
      );
    }
  }

  return (
    <StyledCalendarContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Calendar
            onChange={handleChange}
            value={date}
            tileContent={isCalendarItem}
            calendarType='gregory'
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            formatDay={(locale, date) => dayjs(date).format('D')}
            formatMonthYear={(locale, date) => dayjs(date).format('YYYY. MM')}
          />
          <StyledTodayButtonWrapper>
            <ButtonComponent
              onClick={handleTodayChange}
              backgroundColor={'transparent'}
              text={'Today'}
              textColor={lightTheme.errorColor}
              textSize={'0.8rem'}
            />
          </StyledTodayButtonWrapper>
        </>
      )}
    </StyledCalendarContainer>
  );
}

const StyledDotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.5rem;
  height: 0.8rem;
  margin: 0 auto;
  margin-top: 0.8rem;
`;
const StyledDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${lightTheme.primaryColor};
  border-radius: 50%;
`;
const StyledTodayButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 25px;
`;

const StyledCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 27rem;
  height: 27.2rem;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);

  .react-calendar {
    width: 100%;
    padding: 1rem;
    background: white;
    border: none;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    font-family: 'MoveSansLight';
    line-height: 1rem;
  }
  .react-calendar__navigation button {
    font-size: 1.1rem;
    font-family: 'MoveSansLight';
  }
  .react-calendar__navigation {
    justify-content: center;
  }
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: 'HancomSansSemiBold';
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
    color: ${darkTheme.errorColor};
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${lightTheme.textColor};
  }

  .react-calendar__tile--now {
    background: ${color.lightGreen};
    abbr {
      color: ${color.green};
      font-weight: bold;
    }
  }
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 1.8rem;
    padding: 20px 6.6667px;
    font-size: 1rem;
    color: ${lightTheme.textColor};
  }
  .react-calendar__tile {
    border-radius: 0.5rem;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: ${color.lightGray2};
    color: ${color.pink};
    font-weight: bold;
  }

  @media (min-width: 768px) {
    width: 30rem;
  }
`;
