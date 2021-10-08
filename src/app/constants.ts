import { AddressType, EmailType, PhoneNumberType } from './models/contact';
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
    value: 'firstName',
    text: 'First name',
  },
  {
    value: 'lastName',
    text: 'Last name',
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
  {
    value: 'addresses',
    text: 'Address',
  }
];

export const phoneNumberOptions = Object.freeze([
  {value: PhoneNumberType.Mobile, text: 'Mobile'},
  {value: PhoneNumberType.Home, text: 'Home'},
  {value: PhoneNumberType.Work, text: 'Work'},
  {value: PhoneNumberType.Fax, text: 'Fax'},
]);

export const emailOptions = Object.freeze([
  {value: EmailType.Personal, text: 'Personal'},
  {value: EmailType.Professional, text: 'Professional'},
]);

export const addressOptions = Object.freeze([
  {value: AddressType.Home, text: 'Home'},
  {value: AddressType.Work, text: 'Work'},
]);

export const defaultValue = Object.freeze({
  phoneNumbers: PhoneNumberType.Mobile,
  emails: EmailType.Personal,
  addresses: AddressType.Home,
});
