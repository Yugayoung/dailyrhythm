import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { ThemeType } from '../css/styles.theme';
import { useGetCurrentTheme } from '../store/useDarkModeStore';

export default function Header() {
  const currentTheme = useGetCurrentTheme();
  const [isVisible, setIsVisible] = useState(true);
  const beforeScroll = useRef(0);
  const [isTop, setIsTop] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY === 0;
    const isAtBottom =
      window.innerHeight + currentScrollY >=
      document.documentElement.scrollHeight;
    const isScrollingDown = beforeScroll.current < currentScrollY;

    if (isScrollingDown) {
      setIsVisible(false);
      if (isAtBottom) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
      setIsTop(false);
      if (isAtTop) {
        setIsTop(true);
      }
    }

    beforeScroll.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <StyledHeader
      $isVisible={isVisible}
      $isTop={isTop}
      $currentTheme={currentTheme}
    >
      <Navbar />
    </StyledHeader>
  );
}

const StyledHeader = styled.header<{
  $isVisible: boolean;
  $isTop: boolean;
  $currentTheme: ThemeType;
}>`
  position: fixed;
  width: 100%;
  z-index: 1;
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};
  box-shadow: ${(props) =>
    props.$isTop ? '' : '0 3px 10px rgba(0, 0, 0, 0.2)'};
  background-color: ${(props) =>
    props.$isTop ? 'transparent' : props.$currentTheme.bgColor};
`;
