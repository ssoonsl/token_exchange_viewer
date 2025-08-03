import { configureStore } from '@reduxjs/toolkit';
import { tokensApi } from './api/tokensApi';

export const store = configureStore({
  reducer: {
    [tokensApi.reducerPath]: tokensApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokensApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;