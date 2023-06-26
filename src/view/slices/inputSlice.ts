import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface inputState {
  text: string;
}

const initialState: inputState = {
  text: '',
};

export const inputSlice = createSlice({
  name: 'inputtext',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setText } = inputSlice.actions;

export default inputSlice.reducer;
