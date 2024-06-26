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
import basicLogo from '../images/basicLogo.png';
import { ThemeType, darkTheme } from '../css/styles.theme';
import {
  useDarkModeActions,
  useGetCurrentTheme,
  useGetDarkMode,
} from '../store/useDarkModeStore';
import { FaMoon } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';

export default function Navbar() {
  const user = useGetUser();
  const { setUser, clearUser } = useUserActions();
  const isDarkMode = useGetDarkMode();
  const { toggleDarkMode } = useDarkModeActions();
  const currentTheme = useGetCurrentTheme();

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
      <StyledHeaderDarkModeBox>
        <Link to='/'>
          <LogoImg src={basicLogo} alt='logo' />
        </Link>
        <DarkModeButton onClick={toggleDarkMode} $isDarkMode={isDarkMode}>
          {isDarkMode ? <FaMoon /> : <IoMdSunny />}
        </DarkModeButton>
      </StyledHeaderDarkModeBox>
      {user ? (
        <StyledHeaderBox $currentTheme={currentTheme}>
          <StyledLink to='/my-rhythm' $currentTheme={currentTheme}>
            My하루
          </StyledLink>
          <StyledLink to='/rhythm-statistics' $currentTheme={currentTheme}>
            루틴탐색
          </StyledLink>
          <User user={user} />
          <ButtonComponent text={'Logout'} onClick={handleLogout} />
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

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const StyledHeaderDarkModeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeaderBox = styled.div<{ $currentTheme: ThemeType }>`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $currentTheme }) => $currentTheme.textColor};
`;

const StyledLink = styled(Link)<{ $currentTheme: ThemeType }>`
  color: ${({ $currentTheme }) => $currentTheme.textColor};
  &:hover {
    color: ${({ $currentTheme }) => $currentTheme.primaryColor};
  }
`;

const DarkModeButton = styled.button<{ $isDarkMode: boolean }>`
  width: 4rem;
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
`;
