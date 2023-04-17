import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './store'

interface IdentityState {
  userID: number | null;
  saveID: number | null;
}

const initialState: IdentityState = {
  userID: null,
  saveID: null
}

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.userID = action.payload
    },
    clearUserID: (state) => {
      state.userID = null
    },

    setSaveID: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.saveID = action.payload
    },
    clearSaveID: (state) => {
      state.saveID = null
    },
  },
})

// Actions
export const identityActions = identitySlice.actions

// Selectors
const selectUserID = (state: RootState) => state.identity.userID;
const selectSaveID = (state: RootState) => state.identity.saveID;

export const identitySelectors = {
  selectUserID,
  selectSaveID
}

// Reducer
export const identityReducer = identitySlice.reducer;
