import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateNewRhythm } from '../api/firebase';
import { RhythmItem } from '../components/AddRhythm';

export function useAddRhythm(uid: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { uid: string; rhythm: RhythmItem }>({
    mutationFn: ({ uid, rhythm }) => addOrUpdateNewRhythm(uid, rhythm),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rhythms', uid] });
    },
  });
}
