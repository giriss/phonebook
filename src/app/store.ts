import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsReducer from './reducers/contactsSlice';
import searchReducer from './reducers/searchSlice';

const localStorageContactsKey = 'contactsState';
const initialContactsState = JSON.parse(window.localStorage.getItem(localStorageContactsKey) || 'false');

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    search: searchReducer,
  },
  ...(initialContactsState ? { preloadedState: { contacts: initialContactsState } } : {}),
});

store.subscribe(() => {
  window.localStorage.setItem(localStorageContactsKey, JSON.stringify(store.getState().contacts));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
