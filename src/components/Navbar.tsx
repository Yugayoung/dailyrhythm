import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  handleGoogleLogin,
  handleGoogleLogout,
  handleGoogleAuthStateChange,
} from '../api/firebase';
import { useGetUser, useUserActions } from '../store/useUserStore';
import User from './User';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';
import basicLogoLight from '../images/basicLogoLight.webp';
import basicLogoDark from '../images/basicLogoDark.webp';
import { ThemeType, darkTheme } from '../css/styles.theme';
import {
  useDarkModeActions,
  useGetCurrentTheme,
  useGetDarkMode,
} from '../store/useDarkModeStore';
import { FaMoon } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';
import { BREAKPOINTS } from '../css/styles.width';
import { useWindowSize } from '../hooks/useWindowSize';

export default function Navbar() {
  const user = useGetUser();
  const { setUser, clearUser } = useUserActions();
  const isDarkMode = useGetDarkMode();
  const { toggleDarkMode } = useDarkModeActions();
  const currentTheme = useGetCurrentTheme();
  const currentLogo = isDarkMode ? basicLogoDark : basicLogoLight;
  const windowSize = useWindowSize();
  const isMobileWindow = windowSize.width < parseInt(BREAKPOINTS.mediumMobile);

  useEffect(() => {
    handleGoogleAuthStateChange((user) => {
      setUser(user);
    });
  }, [setUser, clearUser]);

  async function handleLogin() {
    try {
      const userInfo = await handleGoogleLogin();
      setUser(userInfo);
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  }
  async function handleLogout() {
    try {
      await handleGoogleLogout();
      clearUser();
    } catch (error) {
      alert('로그아웃 실패: ' + error.message);
    }
  }

  return (
    <StyledHeaderWrapper>
      <StyledBaseBox>
        <Link to='/'>
          <LogoImg src={currentLogo} />
        </Link>
      </StyledBaseBox>
      {user ? (
        <StyledHeaderBox $currentTheme={currentTheme}>
          <DarkModeButton onClick={toggleDarkMode} $isDarkMode={isDarkMode}>
            {isDarkMode ? <FaMoon /> : <IoMdSunny />}
          </DarkModeButton>
          <StyledMobileHeaderBox $isMobileWindow={isMobileWindow}>
            <StyledLinkBox>
              <StyledLink to='/my-rhythm' $currentTheme={currentTheme}>
                My하루
              </StyledLink>
              <StyledLink to='/rhythm-statistics' $currentTheme={currentTheme}>
                리듬탐색
              </StyledLink>
            </StyledLinkBox>

            <User user={user} onClick={handleLogout} />
          </StyledMobileHeaderBox>
        </StyledHeaderBox>
      ) : (
        <ButtonComponent
          onClick={handleLogin}
          text={'Login'}
          backgroundColor={currentTheme.secondaryColor}
        />
      )}
    </StyledHeaderWrapper>
  );
}

const StyledMobileHeaderBox = styled.div<{
  $isMobileWindow: boolean;
}>`
  align-items: center;
  gap: 0.7rem;
  display: ${({ $isMobileWindow }) => ($isMobileWindow ? 'none' : 'flex')};
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

export const StyledBaseBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLinkBox = styled(StyledBaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
`;

const StyledHeaderBox = styled.div<{ $currentTheme: ThemeType }>`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ $currentTheme }) => $currentTheme.textColor};
`;

const StyledLink = styled(Link)<{ $currentTheme: ThemeType }>`
  color: ${({ $currentTheme }) => $currentTheme.textColor};
  transition: 200ms;
  &:hover {
    color: ${({ $currentTheme }) => $currentTheme.textHoverColor};
  }
`;

const DarkModeButton = styled.button<{ $isDarkMode: boolean }>`
  display: flex;
  justify-content: center;
  padding: 0px;
  font-size: ${({ $isDarkMode }) => ($isDarkMode ? '1.2rem' : '1.5rem')};
  background-color: transparent;
  border: none;
  outline: none;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? darkTheme.primaryColor : '#ff7b00'};
`;

const LogoImg = styled.img`
  width: 8rem;
  color: #ff7b00;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    width: 7rem;
  }
`;
