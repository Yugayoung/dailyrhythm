import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import RhythmDetail from './pages/RhythmDetail';
import RhythmStatistics from './pages/RhythmStatistics';
import ProtectedRoute from './components/ProtectedRoute';

import MyRhythm from './pages/MyRhythm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/my-rhythm',
        element: (
          <ProtectedRoute>
            <MyRhythm />
          </ProtectedRoute>
        ),
      },

      {
        path: '/my-rhythm/:id',
        element: (
          <ProtectedRoute>
            <RhythmDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: '/rhythm-statistics',
        element: (
          <ProtectedRoute>
            <RhythmStatistics />
          </ProtectedRoute>
        ),
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
