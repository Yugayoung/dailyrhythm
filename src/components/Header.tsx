import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const beforeScroll = useRef(0);
  const [isTop, setIsTop] = useState(true); // 초기 상태를 맨 위로 설정

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY === 0;
    const isAtBottom =
      window.innerHeight + currentScrollY >= document.body.offsetHeight;
    const isScrollingDown = beforeScroll.current < currentScrollY;

    if (isAtTop) {
      setIsVisible(true);
      setIsTop(true);
    } else if (isAtBottom) {
      setIsVisible(true);
      setIsTop(false);
    } else if (isScrollingDown) {
      setIsVisible(false);
      setIsTop(false);
    } else {
      setIsVisible(true);
      setIsTop(false);
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
    <StyledHeader $isVisible={isVisible} $isTop={isTop}>
      <Navbar />
    </StyledHeader>
  );
}

const StyledHeader = styled.header<{ $isVisible: boolean; $isTop: boolean }>`
  position: fixed;
  width: 100%;
  height: 5.5rem;
  z-index: 1;
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};
  box-shadow: ${(props) =>
    props.$isTop ? '' : '0 3px 10px rgba(0, 0, 0, 0.2)'};

  background-color: ${(props) =>
    props.$isTop ? 'transparent' : props.theme.bgColor};
`;