import { Filter } from './reducers/searchSlice';

type FilterOption = {
  readonly value: Filter;
  readonly text: string;
};
type FilterOptions = readonly FilterOption[];

export const FILTER_OPTIONS: FilterOptions = [
  {
    value: 'any',
    text: 'Any',
  },
  {
    value: 'fullName',
    text: 'Full name',
  },
  {
    value: 'phoneNumbers',
    text: 'Phone number',
  },
  {
    value: 'emails',
    text: 'Email',
  },
  {
    value: 'dob',
    text: 'Date of birth',
  },
];
