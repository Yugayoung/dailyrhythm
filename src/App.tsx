import React from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router';
import GlobalStyle from './css/GlobalStyles';
import DarkModeProvider from './hooks/DarkModeProvider';

function App() {
  return (
    <DarkModeProvider>
      <GlobalStyle />
      <Header />
      <Outlet />
    </DarkModeProvider>
  );
}

export default App;
