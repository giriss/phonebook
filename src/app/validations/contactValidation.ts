import * as yup from 'yup';

const contactValidation = yup.object().shape({
  fullName: yup.string().label('full name').trim().matches(/^\w+( \w+)+$/, 'full name is invalid').required(),
  dob: yup.date().label('date of birth').required(),
  phoneNumbers: yup.array().of(yup.object().shape({
    value: yup.string().label('phone number').matches(/^[\d -]+$/, 'phone number is invalid').required(),
  })),
  emails: yup.array().of(yup.object().shape({
    value: yup.string().label('email').matches(/^[a-zA-Z\d+.-]+@[a-zA-Z\d.-]+$/, 'email is invalid').required(),
  })),
  addresses: yup.array().of(yup.object().shape({
    value: yup.string().label('address').required(),
  })),
});

export default contactValidation;
