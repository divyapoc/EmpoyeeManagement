import { createSlice } from '@reduxjs/toolkit'
import { registerUser,userLogin } from './authAction'
const storedUserToken = localStorage.getItem('userToken');
const storedUserInfo = localStorage.getItem('user');
const initialState = {
  loading: false,
  userInfo:storedUserInfo ? JSON.parse(storedUserInfo) : {},
  userToken: storedUserToken?storedUserToken:null,
  error: null,
  success: false, 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      // Reset state
      state.userInfo = {};
      state.userToken = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload.user
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      // user login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        state.error = null
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})
export const { logout} = authSlice.actions
export default authSlice.reducer