import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './store'

interface ActionsState {
  items: string[];
}

const initialState: ActionsState = {
  items: [],
}

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    addAction: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    clearActions: (state) => {
      state.items = [];
    },
  },
})

// Actions
export const actionsActions = actionsSlice.actions

// Selectors
const getPreviousActions = (state: RootState) => state.actions.items;
export const actionsSelectors = {
  getPreviousActions
}

// Reducer
export const actionsReducer = actionsSlice.reducer;
