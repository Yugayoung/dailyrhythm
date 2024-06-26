import React from 'react';
import { getRhythm } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '../store/useUserStore';
import { RhythmItem } from './AddRhythm';

export default function RhythmList() {
  const user = useGetUser();
  const uid = user.uid;
  const { data: rhythm, isLoading } = useQuery<RhythmItem[]>({
    queryKey: ['rhythms', uid],
    queryFn: () => getRhythm(uid),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{rhythm[0].id}</div>;
}
