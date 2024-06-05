import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AllRhythm from './pages/AllRhythm';
import RhythmDetail from './pages/RhythmDetail';
import RhythmStatistics from './pages/RhythmStatistics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/my-rhythm', element: <AllRhythm /> },
      {
        path: '/my-rhythm/:id',
        element: <RhythmDetail />,
      },
      {
        path: '/rhythm-statistics',
        element: <RhythmStatistics />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
