import React from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router';
import GlobalStyle from './css/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavbarBottom from './components/NavbarBottom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Header />
      <Outlet />
      <NavbarBottom />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
