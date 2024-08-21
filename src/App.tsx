import React from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router';
import GlobalStyle from './css/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavbarBottom from './components/NavbarBottom';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Header />
      <Outlet />
      <NavbarBottom />
    </QueryClientProvider>
  );
}

export default App;
