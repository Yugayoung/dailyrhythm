import { useRef, useEffect, useCallback } from 'react';

const useScrollCount = (
  end: number,
  start = 300,
  duration = 2000,
  delay = 0
) => {
  const element = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const onScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = element;
      if (current && entry.isIntersecting) {
        let currentNumber = start;
        const counter = setInterval(() => {
          currentNumber += 1;
          if (current) {
            current.innerHTML = currentNumber.toString();
          }
          if (currentNumber === end) {
            clearInterval(counter);
            observer.current?.disconnect();
          }
        }, stepTime);
      }
    },
    [end, start, stepTime]
  );

  useEffect(() => {
    if (element.current) {
      observer.current = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.current.observe(element.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [onScroll]);

  return {
    ref: element,
  };
};

export default useScrollCount;
