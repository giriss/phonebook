export enum PhoneNumberType {
  Mobile = 'Mobile',
  Home = 'Home',
  Work = 'Work',
  Fax = 'Fax',
}

export type PhoneNumber = {
  id: string;
  type: PhoneNumberType;
  value: string;
};

export enum EmailType {
  Personal = 'Personal',
  Professional = 'Professional',
};

export type Email = {
  id: string;
  type: EmailType;
  value: string;
};

export enum AddressType {
  Home = 'Home',
  Work = 'Work',
};

export type Address = {
  id: string;
  type: AddressType;
  value: string;
};

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: Array<PhoneNumber>;
  emails: Array<Email>;
  addresses: Array<Address>;
  dob: string;
};

export default Contact;
