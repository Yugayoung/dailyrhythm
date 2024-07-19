import React from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router';
import GlobalStyle from './css/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Header />
      <Outlet />
      <p>출처 Freepik</p>
    </QueryClientProvider>
  );
}

export default App;
