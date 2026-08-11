import { configureStore, createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeTech: 'javascript',
    completedTopics: []
  },
  reducers: {
    setActiveTech: (state, action) => {
      state.activeTech = action.payload;
    }
  }
});

export const { setActiveTech } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});