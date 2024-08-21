import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { getRhythm } from '../api/firebase';
import { useGetUser } from '../store/useUserStore';
import { RhythmItem } from '../components/AddRhythm';

interface DateRhythmCount {
  date: string;
  count: number;
  doneCount: number;
}

interface RhythmStatistics {
  isLoading: boolean;
  todayRhythmCount: number;
  todayDoneCount: number;
  totalRhythmCount: number;
  totalDoneCount: number;
  dailyRhythmCounts: DateRhythmCount[];
  rhythmDetails: {
    id: string;
    time: string;
    title: string;
    startDate?: string;
    endDate?: string;
    icon: string;
    backgroundColor?: string;
    totalCount: number;
    doneCount: number;
    status: { [date: string]: string };
  }[];
}

export function useRhythmStatistics(): RhythmStatistics {
  const user = useGetUser();
  const uid = user.uid;

  const { data: rhythms, isLoading } = useQuery<RhythmItem[]>({
    queryKey: ['rhythms', uid],
    queryFn: () => getRhythm(uid),
  });

  function calculateDateRhythmCount(rhythms: RhythmItem[]): DateRhythmCount[] {
    const countsByDate: {
      [date: string]: { count: number; doneCount: number };
    } = {};

    rhythms.forEach((rhythm) => {
      const startDate = dayjs(rhythm.startDate);
      const endDate = dayjs(rhythm.endDate);

      for (
        let date = startDate;
        date.isBefore(endDate.add(1, 'day'));
        date = date.add(1, 'day')
      ) {
        const formattedDate = date.format('YYYY-MM-DD');
        // 없으면
        if (!countsByDate[formattedDate]) {
          countsByDate[formattedDate] = { count: 0, doneCount: 0 };
        }
        // 있으면
        countsByDate[formattedDate].count++;
        // 완료 카운트
        if (rhythm.status[formattedDate] === 'done') {
          countsByDate[formattedDate].doneCount++;
        }
      }
    });

    const dayCounts: DateRhythmCount[] = Object.keys(countsByDate).map(
      (date) => ({
        date,
        count: countsByDate[date].count,
        doneCount: countsByDate[date].doneCount,
      })
    );

    return dayCounts;
  }

  const dailyRhythmCounts = calculateDateRhythmCount(rhythms ?? []);

  const today = dayjs();
  const formattedToday = today.format('YYYY-MM-DD');

  // 메서드 활용해서 오늘, 오늘까지의 개수
  const todayRhythmCount =
    dailyRhythmCounts.find((count) => count.date === formattedToday)?.count ??
    0;
  const todayDoneCount =
    dailyRhythmCounts.find((count) => count.date === formattedToday)
      ?.doneCount ?? 0;

  // 총 리듬
  const totalRhythmCount = rhythms
    ? rhythms.reduce((total, rhythm) => {
        return total + (rhythm.status ? Object.keys(rhythm.status).length : 0);
      }, 0)
    : 0;
  const totalDoneCount = rhythms
    ? rhythms.reduce((total, rhythm) => {
        return (
          total +
          Object.keys(rhythm.status).filter(
            (date) => rhythm.status[date] === 'done'
          ).length
        );
      }, 0)
    : 0;

  // 각 리듬
  const rhythmDetails = rhythms
    ? rhythms.map((rhythm) => {
        const doneCount = Object.keys(rhythm.status).filter(
          (date) => rhythm.status[date] === 'done'
        ).length;

        return {
          id: rhythm.id,
          time: rhythm.time,
          title: rhythm.title,
          startDate: rhythm.startDate,
          endDate: rhythm.endDate,
          icon: rhythm.icon,
          backgroundColor: rhythm.backgroundColor,
          totalCount: dailyRhythmCounts.filter(
            (count) => rhythm.status[count.date]
          ).length,
          doneCount: doneCount,
          status: rhythm.status,
        };
      })
    : [];

  return {
    isLoading,
    todayRhythmCount,
    todayDoneCount,
    totalRhythmCount,
    totalDoneCount,
    dailyRhythmCounts,
    rhythmDetails,
  };
}
