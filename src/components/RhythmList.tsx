import React from 'react';
import { getRhythm } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '../store/useUserStore';
import { RhythmItem } from './AddRhythm';
import Loading from './ui/Loading';

export default function RhythmList() {
  const user = useGetUser();
  const uid = user.uid;

  const { data: rhythm, isLoading } = useQuery<RhythmItem[]>({
    queryKey: ['rhythms', uid],
    queryFn: () => getRhythm(uid),
  });

  console.log('Fetched rhythm:', rhythm);

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        Array.isArray(rhythm) && (
          <ul>
            {rhythm.map((item) => (
              <li key={item.id}>
                <p>{item.time}</p>
                <p>{item.title}</p>
                <p>{item.startDate}</p>
                <p>{item.endDate}</p>
                <p>{item.backgroundColor}</p>
                <p>{item.icon}</p>
                <p>{item.status}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}
