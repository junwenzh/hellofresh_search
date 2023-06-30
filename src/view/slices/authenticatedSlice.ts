import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface authenticatedState {
  authenticated: boolean;
}

const initialState: authenticatedState = {
  authenticated: false,
};

export const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticated } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
