import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  handleGoogleLogin,
  handleGoogleLogout,
  handleGoogleAuthStateChange,
} from '../api/firebase';
import { userStore } from '../store/useUserStore';
import User from './User';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';
import basicLogo from '../images/basicLogo.png';
import { lightTheme } from '../css/styles.theme';

export default function Header() {
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.actions.setUser);
  const clearUser = userStore((state) => state.actions.clearUser);

  useEffect(() => {
    handleGoogleAuthStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, [setUser, clearUser]);

  async function handleLogin() {
    try {
      const userInfo = await handleGoogleLogin();
      setUser(userInfo);
      console.log('로그인 성공:', userInfo);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  }
  async function handleLogout() {
    try {
      await handleGoogleLogout();
      clearUser();
      console.log('로그아웃 성공');
    } catch {
      // 질문 : 콘솔로그를 안띄우는 대신에 어떤걸 넣어야하나
      console.error('로그아웃 실패');
    }
  }

  return (
    <StyledHeader>
      <Link to='/'>
        <LogoImg src={basicLogo} alt='logo' />
      </Link>
      {user ? (
        <StyledHeaderBox>
          <Link to='/my-rhythm'>myrhythm</Link>
          <Link to='/rhythm-statistics'>Rhythm Statistics</Link>
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
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
`;

const StyledHeaderBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoImg = styled.img`
  width: 10rem;
`;
