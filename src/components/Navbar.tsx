import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  handleGoogleLogin,
  handleGoogleLogout,
  handleGoogleAuthStateChange,
} from '../api/firebase';
import { useUserStore } from '../store/useUserStore';
import User from './User';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';
import basicLogo from '../images/basicLogo.png';
import { lightTheme } from '../css/styles.theme';
import { useDarkModeStore } from '../store/useDarkModeStore';

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.actions.setUser);
  const clearUser = useUserStore((state) => state.actions.clearUser);
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const toggleDarkMode = useDarkModeStore(
    (state) => state.actions.toggleDarkMode
  );

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
      <Link to='/'>
        <LogoImg src={basicLogo} alt='logo' />
      </Link>
      <ButtonComponent
        onClick={toggleDarkMode}
        text={darkMode.darkMode ? 'Light Mode' : 'Dark Mode'}
        backgroundColor={lightTheme.accentColor}
      />
      {user ? (
        <StyledHeaderBox>
          <Link to='/my-rhythm'>My하루</Link>
          <Link to='/rhythm-statistics'>루틴탐색</Link>
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
  position: fixed;
  width: 98%;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  z-index: 1;
`;

const StyledHeaderBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: red;
`;

const LogoImg = styled.img`
  width: 10rem;
`;
