import { useRef, useEffect, useCallback } from 'react';

const useScrollFadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  duration = 1,
  delay = 0
) => {
  const element = useRef<HTMLImageElement | null>(null);

  const handleDirection = (name: 'up' | 'down' | 'left' | 'right'): string => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 50%, 0)';
      case 'down':
        return 'translate3d(0, -50%, 0)';
      case 'left':
        return 'translate3d(50%, 0, 0)';
      case 'right':
        return 'translate3d(-50%, 0, 0)';
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const onScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = element;
      if (current && entry.isIntersecting) {
        current.style.transitionProperty = 'all';
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = '1';
        current.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold: 0.6 });
      observer.observe(element.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onScroll]);

  return {
    ref: element,
    style: { opacity: 0, transform: handleDirection(direction) },
  };
};

export default useScrollFadeIn;
