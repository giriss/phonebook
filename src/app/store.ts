import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsReducer from './reducers/contactsSlice';
import searchReducer from './reducers/searchSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
