import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, onAuthStateChange } from '../api/firebase';
import { useStore } from '../store/useUserStore';
import User from './User';
import styled from 'styled-components';
import ButtonComponent from './ui/ButtonComponent';

export default function Header() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);

  useEffect(() => {
    onAuthStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, [setUser, clearUser]);
  const handleLogin = () => {
    login().then((userInfo) => {
      setUser(userInfo);
      console.log('로그인 성공:', userInfo);
    });
  };
  const handleLogout = () => {
    logout().then(() => {
      clearUser();
      console.log('로그아웃 성공');
    });
  };

  return (
    <HeaderCss>
      <Link to='/'>
        <LogoImg
          src={`${process.env.PUBLIC_URL}/images/basicLogo.png`}
          alt='logo'
        />
      </Link>
      {user ? (
        <HeaderDiv>
          <Link to='/myrhythm'>myrhythm</Link>
          <Link to='/rhythmStatistics'>Rhythm Statistics</Link>
          <User user={user} />
          <ButtonComponent
            backgroundColor={'color(--color-bg)'}
            text={'Logout'}
            onClick={handleLogout}
          ></ButtonComponent>
        </HeaderDiv>
      ) : (
        <ButtonComponent
          backgroundColor={'red'}
          text={'Login'}
          onClick={handleLogin}
        ></ButtonComponent>
      )}
    </HeaderCss>
  );
}

const HeaderCss = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoImg = styled.img`
  width: 10rem;
`;
