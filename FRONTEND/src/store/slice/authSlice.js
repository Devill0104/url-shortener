import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log(state.isAuthenticated, state.user)
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions; 