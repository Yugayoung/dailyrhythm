import React, { useState } from 'react';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useRhythm } from '../hooks/useRhythm';
import { RhythmItem } from './AddRhythm';
import { StyledBaseBox } from './Navbar';
import styled from 'styled-components';
import { color, lightTheme } from '../css/styles.theme';
import { FaCheck } from 'react-icons/fa';

interface RhythmExpandedTableProps {
  rhythmId: string;
  uid: string;
}

export default function RhythmExpandedTable({
  rhythmId,
  uid,
}: RhythmExpandedTableProps) {
  const { rhythmDetails } = useRhythmStatistics();
  const { updateRhythm } = useRhythm(uid);
  const rhythm = rhythmDetails.find((item) => item.id === rhythmId);
  const [selectAll, setSelectAll] = useState(false);

  if (!rhythm) return null;

  const handleUpdateRhythmStatus = (date: string) => {
    const newStatus = rhythm.status[date] === 'active' ? 'done' : 'active';
    const updatedRhythm: RhythmItem = {
      ...rhythm,
      status: {
        ...rhythm.status,
        [date]: newStatus,
      },
    };

    updateRhythm.mutate({
      uid,
      rhythm: updatedRhythm,
    });
  };
  function handleSelectAll() {
    const newStatus = selectAll ? 'active' : 'done';
    //reduce: 배열이나 객체를 순회하면서 값을 누적해서 하나의 결과값으로 반환
    const updatedStatus = Object.keys(rhythm.status).reduce((acc, date) => {
      acc[date] = newStatus;
      return acc;
    }, {} as Record<string, string>);

    const updatedRhythm: RhythmItem = {
      ...rhythm,
      status: updatedStatus,
    };

    updateRhythm.mutate({
      uid,
      rhythm: updatedRhythm,
    });

    setSelectAll(!selectAll);
  }

  return (
    <StyledRhythmExpandedBox>
      <StyledRhythmExpandedTitleBox>
        <StyledRhythmExpandedText className='size_large header_size'>
          Date
        </StyledRhythmExpandedText>
        <StyledRhythmExpandedText className='size_large header_size'>
          <p>check</p>
          <input
            type='checkbox'
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </StyledRhythmExpandedText>
      </StyledRhythmExpandedTitleBox>
      <StyledRhythmExpandedUl>
        {Object.entries(rhythm.status).map(([date, status]) => (
          <StyledRhythmExpandedLi key={date}>
            <StyledRhythmExpandedText className='size_large border'>
              {date}
            </StyledRhythmExpandedText>
            <StyledRhythmExpandedText className='size_large'>
              <StyledRhythmExpandedButton
                onClick={() => handleUpdateRhythmStatus(date)}
              >
                {status === 'done' ? (
                  <StyledRhythmExpandedDoneButton>
                    <FaCheck />
                  </StyledRhythmExpandedDoneButton>
                ) : (
                  <>
                    <FaCheck />
                  </>
                )}
              </StyledRhythmExpandedButton>
            </StyledRhythmExpandedText>
          </StyledRhythmExpandedLi>
        ))}
      </StyledRhythmExpandedUl>
    </StyledRhythmExpandedBox>
  );
}

const StyledRhythmExpandedDoneButton = styled(StyledBaseBox)`
  color: ${lightTheme.supportingColor};
`;
const StyledRhythmExpandedButton = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${lightTheme.placeholderColor};
  border: none;
  background-color: ${color.lightGray3};
`;
const StyledRhythmExpandedBox = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
`;
const StyledRhythmExpandedTitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: bold;
`;

const StyledRhythmExpandedUl = styled.ul`
  text-align: center;
  border-collapse: collapse;
  overflow-y: scroll;
  height: 200px;
`;
const StyledRhythmExpandedLi = styled.li`
  display: flex;
`;
const StyledRhythmExpandedText = styled(StyledBaseBox)`
  border-bottom: 2px solid ${lightTheme.textColor};
  text-align: center;
  height: 2rem;
  font-size: 0.9rem;
  padding: 0.3rem 0rem;
  &.border {
    border-right: 2px solid ${lightTheme.textColor};
  }
  &.header_size {
    font-size: 0.9rem;
  }
  &.size_x-small {
    width: 6%;
  }
  &.size_small {
    width: 10%;
  }
  &.size_medium {
    width: 20%;
  }
  &.size_large {
    width: 50%;
  }
`;
