import { createSlice } from '@reduxjs/toolkit';

import authApi from '../apis/authApi';
import { IUser } from '../../../@types/user';

const initialState: {
  status: 'pending' | 'authed' | 'guest',
  user: IUser | null
} = {
  status: 'pending',
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.status = 'guest';
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.status = 'authed';
      localStorage.setItem('token', payload.token)
    });
    builder.addMatcher(authApi.endpoints.ping.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.status = 'authed';
      localStorage.setItem('token', payload.token)
    });
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.status = 'authed';
      localStorage.setItem('token', payload.token)
    });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;