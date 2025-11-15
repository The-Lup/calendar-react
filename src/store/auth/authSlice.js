import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'second',
  initialState: {
    status: 'not-authenticated', //'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined,
  },

  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },

    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },

    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, onClearErrorMessage } =
  authSlice.actions;
