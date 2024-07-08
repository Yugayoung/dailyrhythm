import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RhythmItem } from '../components/AddRhythm';
import {
  firebaseAddNewRhythm,
  firebaseRemoveRhythm,
  firebaseUpdateRhythm,
} from '../api/firebase';

export function useRhythm(uid: string) {
  const queryClient = useQueryClient();

  const addNewRhythm = useMutation<
    void,
    Error,
    { uid: string; rhythm: RhythmItem }
  >({
    mutationFn: ({ uid, rhythm }) => firebaseAddNewRhythm(uid, rhythm),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rhythms', uid] });
    },
  });

  const updateRhythm = useMutation<
    void,
    Error,
    { uid: string; rhythm: RhythmItem }
  >({
    mutationFn: ({ uid, rhythm }) => firebaseUpdateRhythm(uid, rhythm),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rhythms', uid] });
    },
  });

  const removeRhythm = useMutation<
    void,
    Error,
    { uid: string; rhythm: RhythmItem }
  >({
    mutationFn: ({ uid, rhythm }) => firebaseRemoveRhythm(uid, rhythm),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rhythms', uid] });
    },
  });

  return { addNewRhythm, updateRhythm, removeRhythm };
}
