import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  handleGoogleLogin,
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
import { FaMoon, FaRegClock } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';
import { BREAKPOINTS } from '../css/styles.width';
import { useWindowSize } from '../hooks/useWindowSize';
import { useTokenExpirationTimer } from '../hooks/useTokenExpirationTimer';
import dayjs from 'dayjs';

export default function Navbar() {
  const user = useGetUser();
  const { setUser, clearUser } = useUserActions();
  const isDarkMode = useGetDarkMode();
  const { toggleDarkMode } = useDarkModeActions();
  const currentTheme = useGetCurrentTheme();
  const currentLogo = isDarkMode ? basicLogoDark : basicLogoLight;
  const windowSize = useWindowSize();
  const isMobileWindow = windowSize.width < parseInt(BREAKPOINTS.mediumMobile);

  const {
    timeRemaining,
    setTokenExpirationTimer,
    handleExtendToken,
    handleLogout,
  } = useTokenExpirationTimer();
  const formattedTimeRemaining =
    timeRemaining !== null
      ? dayjs.unix(timeRemaining).format('mm:ss')
      : '00:00';

  useEffect(() => {
    handleGoogleAuthStateChange((user) => {
      if (user) {
        setUser(user);
        setTokenExpirationTimer();
      } else {
        clearUser();
      }
    });
  }, [setUser, clearUser, setTokenExpirationTimer]);

  async function handleLogin() {
    try {
      const userInfo = await handleGoogleLogin();
      setUser(userInfo);
      setTokenExpirationTimer();
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  }

  return (
    <StyledHeaderWrapper>
      <StyledBaseBox>
        <Link to='/'>
          <LogoImg src={currentLogo} alt='basicLogo' />
        </Link>
      </StyledBaseBox>
      {user ? (
        <StyledHeaderBox $currentTheme={currentTheme}>
          <StyledTokenTimeBox>
            <StyledTokenTimeTextBox>
              <StyledBaseBox>
                <FaRegClock />
              </StyledBaseBox>
              <StyledTokenTimeText>
                {formattedTimeRemaining}
              </StyledTokenTimeText>
            </StyledTokenTimeTextBox>
            <ButtonComponent
              onClick={handleExtendToken}
              text={'시간연장'}
              backgroundColor={'transparent'}
              className='timeButton'
              textSize='0.95rem'
            />
          </StyledTokenTimeBox>
          <StyledMobileHeaderBox $isMobileWindow={isMobileWindow}>
            <User user={user} onClick={handleLogout} />
            <StyledLinkBox>
              <StyledLink to='/my-rhythm' $currentTheme={currentTheme}>
                My하루
              </StyledLink>
              <StyledLink to='/rhythm-statistics' $currentTheme={currentTheme}>
                리듬탐색
              </StyledLink>
            </StyledLinkBox>
          </StyledMobileHeaderBox>
          <DarkModeButton
            onClick={toggleDarkMode}
            $isDarkMode={isDarkMode}
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {isDarkMode ? <FaMoon /> : <IoMdSunny />}
          </DarkModeButton>
        </StyledHeaderBox>
      ) : (
        <StyledLinkBox>
          <ButtonComponent
            onClick={handleLogin}
            text={'Login'}
            backgroundColor={currentTheme.secondaryColor}
          />
          <DarkModeButton
            onClick={toggleDarkMode}
            $isDarkMode={isDarkMode}
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {isDarkMode ? <FaMoon /> : <IoMdSunny />}
          </DarkModeButton>
        </StyledLinkBox>
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

const StyledTokenTimeBox = styled(StyledBaseBox)`
  font-size: 0.9rem;
  padding-top: 0.1rem;
`;
const StyledTokenTimeTextBox = styled(StyledBaseBox)`
  gap: 0.3rem;
`;
const StyledTokenTimeText = styled.p`
  width: 3.4rem;
  font-size: 1rem;
`;
const StyledLinkBox = styled(StyledBaseBox)`
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
