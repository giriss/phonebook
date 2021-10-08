import * as yup from 'yup';

const contactValidation = yup.object().shape({
  firstName: yup.string().label('first name').trim().matches(/^\w+( \w+)*$/, 'first name is invalid').required(),
  lastName: yup.string().label('last name').trim().matches(/^\w+( \w+)*$/, 'last name is invalid').required(),
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
