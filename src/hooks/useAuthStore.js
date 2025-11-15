import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from '../store/auth/authSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const msg = error.response?.data?.msg || 'Authentication failed';
      dispatch(onLogout(msg));
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const msg = error.response?.data?.msg || 'Registration failed';
      dispatch(onLogout(msg));
    }
  };

  const clearErrorMessage = useCallback(() => {
    dispatch(onClearErrorMessage());
  }, [dispatch]);

  const checkAuthToken = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  }, [dispatch]);

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //Props
    errorMessage,
    status,
    user,

    //Methods
    checkAuthToken,
    clearErrorMessage,
    startLogin,
    startLogout,
    startRegister,
  };
};
