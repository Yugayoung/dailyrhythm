import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

export default function Header() {
  // 1. 브라우저에 맨 위와 맨 아래일때 보여주고 스크롤이 위로할 때는 헤더를 보여주지 않는다.
  // 2. 화살표 버튼으로 섹션하나씩 스크롤되기
  const [isVisible, setIsVisible] = useState(true);
  const beforeScroll = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY === 0;
    const isAtBottom =
      window.innerHeight + currentScrollY >= document.body.offsetHeight;
    const isScrollingDown = beforeScroll.current < currentScrollY;

    if (isAtTop || isAtBottom) {
      setIsVisible(true);
    } else if (isScrollingDown) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
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
    <StyledHeader isVisible={isVisible}>
      <Navbar />
    </StyledHeader>
  );
}

const StyledHeader = styled.header<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'visible' : 'none')};
`;
