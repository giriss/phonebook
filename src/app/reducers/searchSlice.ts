import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Contact from '../models/contact';
import { RootState } from '../store';

export type Filter = Exclude<keyof Contact, 'id'> | 'any';

export type SearchState = {
  criteria: string;
  filter: Filter;
};

const initialState: SearchState = {
  criteria: '',
  filter: 'any',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateCriteria(state, { payload: criteria }: PayloadAction<string>) {
      state.criteria = criteria;
    },
    updateFilter(state, { payload: filter }: PayloadAction<Filter>) {
      state.filter = filter;
    },
    clearSearch: () => initialState,
  },
});

export const { updateCriteria, updateFilter, clearSearch } = searchSlice.actions;

export const selectCriteria = (state: RootState) => state.search.criteria;
export const selectFilter = (state: RootState) => state.search.filter;

export default searchSlice.reducer;
