export type PhoneNumberType = 'mobile' | 'home' | 'work' | 'fax';

export type PhoneNumber = {
  type: PhoneNumberType;
  value: string;
};

export type EmailType = 'personal' | 'professional';

export type Email = {
  type: EmailType;
  value: string;
};

type Contact = {
  id?: string;
  fullName: string;
  phoneNumbers: Array<PhoneNumber>;
  emails: Array<Email>;
  dob?: Date;
};

export default Contact;
