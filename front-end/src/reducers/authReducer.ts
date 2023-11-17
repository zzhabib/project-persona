import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BaseUser = {id: number, email: string}

interface AuthState {
  isLoggedIn: boolean;
  user: BaseUser | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<BaseUser>) => {
      state.user = action.payload
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
