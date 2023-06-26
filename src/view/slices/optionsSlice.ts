import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface OptionsState {
  options: string[];
}

const initialState: OptionsState = {
  options: [],
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<string[]>) => {
      state.options = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
