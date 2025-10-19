import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  profile: null,
  isLogin: false,
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any | null>) => {
      state.profile = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    clearProfile: state => {
      state.profile = null;
      state.isLogin = false;
    },
  },
});

export const { setProfile, setIsLogin, clearProfile } = profile.actions;
export default profile.reducer;
