import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

type TAuthState = {
  user: TUser | null;
};

const initialState: TAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
