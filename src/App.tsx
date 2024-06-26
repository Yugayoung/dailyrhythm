import React from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router';
import GlobalStyle from './css/GlobalStyles';
import DarkModeProvider from './hooks/DarkModeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <GlobalStyle />
        <Header />
        <Outlet />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
