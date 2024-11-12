import { useCallback, useEffect, useState, useRef } from 'react';
import { getTokenExpirationTime } from '../api/firebase';
import { useUserActions, useGetUser } from '../store/useUserStore';
import { getAuth } from 'firebase/auth';

export const useTokenExpirationTimer = () => {
  const { clearUser } = useUserActions();
  const auth = getAuth();
  const user = useGetUser();
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const isLoggedOut = useRef(false);

  const handleLogout = useCallback(async () => {
    if (isLoggedOut.current) return;
    isLoggedOut.current = true;

    try {
      await auth.signOut();
      clearUser();
      alert('로그아웃되었습니다.');
    } catch (error) {
      alert('로그아웃 실패: ' + error.message);
    }
  }, [auth, clearUser]);

  const setTokenExpirationTimer = useCallback(async () => {
    const expirationTime = await getTokenExpirationTime();
    if (expirationTime) {
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;

      setTimeRemaining(Math.floor(timeLeft / 1000));

      if (intervalId.current) {
        clearInterval(intervalId.current);
      }

      intervalId.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 1) return prev - 1;
          clearInterval(intervalId.current!);
          handleLogout();
          return null;
        });
      }, 1000);

      const logoutTimer = setTimeout(() => {
        handleLogout();
      }, timeLeft);

      return () => {
        clearTimeout(logoutTimer);
        clearInterval(intervalId.current!);
      };
    }
  }, [handleLogout]);

  const handleExtendToken = async () => {
    if (user) {
      try {
        await auth.currentUser?.getIdToken(true);
        alert('세션이 연장되었습니다.');
        isLoggedOut.current = false;
        setTokenExpirationTimer();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setTokenExpirationTimer();
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [setTokenExpirationTimer]);

  return {
    timeRemaining,
    handleExtendToken,
    setTokenExpirationTimer,
    handleLogout,
  };
};
