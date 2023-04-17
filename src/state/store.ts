import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { identityReducer } from './identity';
import { actionsReducer } from './actions';

const persistConfig = {
  key: 'root',
  storage,
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    identity: identityReducer,
    actions: actionsReducer
  })),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
