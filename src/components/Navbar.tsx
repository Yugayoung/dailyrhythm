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
import { darkTheme, lightTheme } from '../css/styles.theme';
import { useDarkModeActions, useGetDarkMode } from '../store/useDarkModeStore';
import { FaMoon } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';

export default function Navbar() {
  const user = useGetUser();
  const { setUser, clearUser } = useUserActions();
  const isDarkMode = useGetDarkMode();
  const { toggleDarkMode } = useDarkModeActions();

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
      console.error('로그인 실패:', error);
    }
  }
  async function handleLogout() {
    try {
      await handleGoogleLogout();
      clearUser();
    } catch {
      // 질문 : 콘솔로그를 안띄우는 대신에 어떤걸 넣어야하나
      console.error('로그아웃 실패');
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
        <StyledHeaderBox>
          <StyledLink to='/my-rhythm'>My하루</StyledLink>
          <StyledLink to='/rhythm-statistics'>루틴탐색</StyledLink>
          <User user={user} />
          <ButtonComponent text={'Logout'} onClick={handleLogout} />
        </StyledHeaderBox>
      ) : (
        <ButtonComponent
          onClick={handleLogin}
          text={'Login'}
          backgroundColor={lightTheme.accentColor}
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

const StyledHeaderBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
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
