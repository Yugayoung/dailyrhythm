import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, onAuthStateChange } from '../api/firebase';
import { useStore } from '../store/useUserStore';

export default function Header() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);

  const handleLogin = () => {
    login().then((userInfo) => {
      setUser(userInfo);
      console.log('로그인 성공:', userInfo);
    });
  };

  useEffect(() => {
    onAuthStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, [setUser]);

  const handleLogout = () => {
    logout().then(() => {
      clearUser();
      console.log('로그아웃 성공');
    });
  };

  return (
    <header>
      <Link to='/'>
        <img
          src={`${process.env.PUBLIC_URL}/images/basicLogo.png`}
          alt='logo'
        />
      </Link>
      {!user && <button onClick={handleLogin}>Login</button>}
      {user && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}
