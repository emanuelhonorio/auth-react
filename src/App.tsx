import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar/'
import { AuthProvider } from './contexts/AuthContext';
import UsersPage from './pages/users/UsersPage';
import LoginPage from './pages/login/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import RegisterPage from './pages/register/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import UnauthorizedPage from './pages/Unauthorized';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <AuthNavigator />
      <Navbar />
        <div className="content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route path='/unauthorized' element={<UnauthorizedPage/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

// Este componente usa o hook useNavigate para configurar a navegação no AuthProvider
const AuthNavigator: React.FC = () => {
  const { setNavigate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(() => navigate);
  }, [navigate, setNavigate]);

  return null;
};


export default App
