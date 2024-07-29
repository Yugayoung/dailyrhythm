import React from 'react';
import styled from 'styled-components';
import { FcCalendar, FcAlarmClock } from 'react-icons/fc';
import { DatePicker, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';

interface TimeAndPeriodProps {
  time: string;
  startDate?: string;
  endDate?: string;
  onTimeChange: (time: dayjs.Dayjs | null, timeString: string) => void;
  onRangeChange: (
    dates: [dayjs.Dayjs, dayjs.Dayjs],
    dateStrings: [string, string]
  ) => void;
}

const FORMAT = 'HH:mm';
const { RangePicker } = DatePicker;

function TimeAndPeriod({
  time,
  startDate,
  endDate,
  onTimeChange,
  onRangeChange,
}: TimeAndPeriodProps) {
  return (
    <>
      <StyledAddRhythmTimeAndPeriodBox>
        <div>
          <StyledAddRhythmTitle>
            <StyledAddRhythmIcon $fontSize={'1.3rem'}>
              <FcCalendar />
            </StyledAddRhythmIcon>
            Period
          </StyledAddRhythmTitle>
          <Space direction='vertical'>
            <RangePicker
              value={[
                startDate ? dayjs(startDate) : null,
                endDate ? dayjs(endDate) : null,
              ]}
              onChange={onRangeChange}
            />
          </Space>
        </div>
        <div>
          <StyledAddRhythmTitle>
            <StyledAddRhythmIcon $fontSize={'1.2rem'}>
              <FcAlarmClock />
            </StyledAddRhythmIcon>
            Time
          </StyledAddRhythmTitle>
          <TimePicker
            value={time ? dayjs(time, FORMAT) : null}
            format={FORMAT}
            onChange={onTimeChange}
          />
        </div>
      </StyledAddRhythmTimeAndPeriodBox>
    </>
  );
}

export default React.memo(TimeAndPeriod);

const StyledAddRhythmTimeAndPeriodBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledAddRhythmIcon = styled.div<{ $fontSize: string }>`
  font-size: ${({ $fontSize }) => $fontSize};
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
`;
const StyledAddRhythmTitle = styled.h2`
  display: flex;
  align-items: center;
  margin: 0.5rem 0rem 0.7rem 0rem;
  font-size: 1.1rem;
`;
