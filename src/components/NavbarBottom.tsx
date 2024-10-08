import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ThemeType } from '../css/styles.theme';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import User from './User';
import { useGetUser, useUserActions } from '../store/useUserStore';
import { Link } from 'react-router-dom';
import { StyledBaseBox } from './Navbar';
import { useWindowSize } from '../hooks/useWindowSize';
import { BREAKPOINTS } from '../css/styles.width';
import {
  handleGoogleAuthStateChange,
  handleGoogleLogout,
} from '../api/firebase';

export default function NavbarBottom() {
  const currentTheme = useGetCurrentTheme();
  const user = useGetUser();
  const { setUser, clearUser } = useUserActions();
  const windowSize = useWindowSize();
  const isMobileWindow = windowSize.width < parseInt(BREAKPOINTS.mediumMobile);
  useEffect(() => {
    handleGoogleAuthStateChange((user) => {
      setUser(user);
    });
  }, [setUser, clearUser]);
  async function handleLogout() {
    try {
      await handleGoogleLogout();
      clearUser();
    } catch (error) {
      alert('로그아웃 실패: ' + error.message);
    }
  }
  return (
    user && (
      <StyledNavbarWrapper
        $currentTheme={currentTheme}
        $isMobileWindow={isMobileWindow}
      >
        <StyledNavbarBox>
          <div>
            <StyledLink to='/my-rhythm' $currentTheme={currentTheme}>
              My하루
            </StyledLink>
          </div>
          <div>
            <StyledLink to='/rhythm-statistics' $currentTheme={currentTheme}>
              리듬탐색
            </StyledLink>
          </div>
          <StyledUserBox>
            <User user={user} onClick={handleLogout} />
          </StyledUserBox>
        </StyledNavbarBox>
      </StyledNavbarWrapper>
    )
  );
}

const StyledNavbarWrapper = styled.section<{
  $currentTheme: ThemeType;
  $isMobileWindow: boolean;
}>`
  position: fixed;
  width: 100%;
  z-index: 1;
  bottom: 0;
  background-color: ${({ $currentTheme }) => $currentTheme.bgColor};
  display: ${({ $isMobileWindow }) => ($isMobileWindow ? 'block' : 'none')};
`;
const StyledLink = styled(Link)<{ $currentTheme: ThemeType }>`
  color: ${({ $currentTheme }) => $currentTheme.textColor};
  transition: 200ms;

  &:hover {
    color: ${({ $currentTheme }) => $currentTheme.textHoverColor};
  }
`;
const StyledNavbarBox = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  text-align: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  height: 3.5rem;
`;
const StyledUserBox = styled(StyledBaseBox)``;
