import {createSlice} from '@reduxjs/toolkit';

const AuthReducer = createSlice({
  name: 'Auth',
  initialState: {
    isLogin: false,
    isProfileComplete: false,
    isSubscribed: false,
    isVerified: false,
    isAnySubscribe: false,
    userData: {},
    availableMatch: 0,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsProfileComplete: (state, action) => {
      state.isProfileComplete = action.payload;
    },
    setIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload;
    },
    setIsAnySubscribe: (state, action) => {
      state.isAnySubscribe = action.payload;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setAvailableMatch: (state, action) => {
      state.availableMatch = action.payload;
    },
    setLogout: state => {
      state.isLogin = false;
      state.userData = {};
      state.isProfileComplete = false;
      state.isSubscribed = false;
      state.isAnySubscribe = false;
      state.availableMatch = 0;
    },
  },
});

export const {
  setLoginState,
  setUserData,
  setIsProfileComplete,
  setIsSubscribed,
  setIsAnySubscribe,
  setIsVerified,
  setAvailableMatch,
  setLogout,
} = AuthReducer.actions;

export default AuthReducer.reducer;
