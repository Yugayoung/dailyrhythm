import { useRef, useEffect, useCallback } from 'react';

const useScrollCount = (end, start = 300, duration = 2000, delay = 0) => {
  const element = useRef();
  const observer = useRef(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const onScroll = useCallback(
    ([entry]) => {
      const { current } = element;
      if (entry.isIntersecting) {
        let currentNumber = start;
        const counter = setInterval(() => {
          currentNumber += 1;
          current.innerHTML = currentNumber;
          if (currentNumber === end) {
            clearInterval(counter);
            observer.current.disconnect(); // Disconnect directly from the ref
          }
        }, stepTime);
      }
    },
    [end, start, stepTime, element]
  );

  useEffect(() => {
    if (element.current) {
      observer.current = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.current.observe(element.current);
    }

    // Use a separate useEffect for cleanup
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
