import React, { useState } from 'react';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useRhythm } from '../hooks/useRhythm';
import { RhythmItem } from './AddRhythm';

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
    // 배열이나 객체를 순회하면서 값을 누적해서 하나의 결과값으로 반환
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
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
          <th>check</th>
          <th>
            <input
              type='checkbox'
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rhythm.status).map(([date, status]) => (
          <tr key={date}>
            <td>{date}</td>
            <td>{status}</td>
            <td>
              <button onClick={() => handleUpdateRhythmStatus(date)}>
                {status === 'done' ? 'Undo' : 'Done'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
