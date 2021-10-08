import { nanoid } from '@reduxjs/toolkit';
import { FormikErrors, FormikProps } from 'formik';
import React, { useMemo, forwardRef } from 'react';
import { Divider, Form, FormProps, Header, Ref } from 'semantic-ui-react';
import { addressOptions, defaultValue, emailOptions, phoneNumberOptions } from '../../app/constants';
import Contact, { Address, Email, PhoneNumber } from '../../app/models/contact';
import DynamicFormGroupBuilder from './DynamicFormGroupBuilder';

type FormGroupType = 'emails' | 'addresses' | 'phoneNumbers';

type Props = FormikProps<Contact> & {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, data: FormProps) => void;
};

export default forwardRef<HTMLElement, Props>(function({
  onSubmit,
  handleChange,
  handleBlur,
  values,
  setValues,
  setFieldValue,
  errors,
  touched,
}, ref) {
  const commonInputProps = useMemo(() => ({
    onChange: handleChange,
    onBlur: handleBlur,
    fluid: true,
  }), [handleChange, handleBlur]);

  const addDynamicItem = (formGroup: FormGroupType) => {
    const updatedValues = {...values};
    updatedValues[formGroup] = [
      ...updatedValues[formGroup],
      {
        type: defaultValue[formGroup],
        value: '',
        id: nanoid(),
      } as any,
    ];
    setValues(updatedValues);
  };

  const removeDynamicItem = (formGroup: FormGroupType, id: string) => {
    const updatedValues = {...values};
    updatedValues[formGroup] = (updatedValues[formGroup] as any[]).filter(val => val.id !== id);
    setValues(updatedValues);
  };

  return (
    <Ref innerRef={ref}>
      <Form onSubmit={onSubmit}>
        <Header>Personal info</Header>
        <Form.Group widths="equal">
          <Form.Input
            name="fullName"
            label="Full name"
            placeholder="Full name"
            value={values.fullName}
            error={touched.fullName && errors.fullName}
            {...commonInputProps}
          />
          <Form.Input
            name="dob"
            label="Date of birth"
            type="date"
            value={values.dob}
            error={touched.dob && errors.dob}
            {...commonInputProps}
          />
        </Form.Group>
        <Divider hidden />
        <DynamicFormGroupBuilder
          groupName="Phone numbers"
          itemName="phone number"
          items={values.phoneNumbers}
          onAdd={() => addDynamicItem('phoneNumbers')}
          onRemove={id => removeDynamicItem('phoneNumbers', id)}
        >
          {(_id, index) => (
            <>
              <Form.Input
                name={`phoneNumbers[${index}]["value"]`}
                label="Phone number"
                placeholder="123456789"
                value={values.phoneNumbers[index].value}
                error={
                  touched.phoneNumbers?.[index]?.value &&
                  (errors.phoneNumbers?.[index] as FormikErrors<PhoneNumber>)?.value
                }
                {...commonInputProps}
              />
              <Form.Select
                fluid
                name={`phoneNumbers[${index}]["type"]`}
                label="Type"
                options={[...phoneNumberOptions]}
                value={values.phoneNumbers[index].type}
                onChange={(_, { value }) => setFieldValue(`phoneNumbers[${index}]["type"]`, value)}
              />
            </>
          )}
        </DynamicFormGroupBuilder>
        <Divider hidden />
        <DynamicFormGroupBuilder
          groupName="Emails"
          itemName="email"
          items={values.emails}
          onAdd={() => addDynamicItem('emails')}
          onRemove={id => removeDynamicItem('emails', id)}
        >
          {(_id, index) => (
            <>
              <Form.Input
                name={`emails[${index}]["value"]`}
                label="Email"
                placeholder="name@example.com"
                value={values.emails[index].value}
                error={
                  touched.emails?.[index]?.value &&
                  (errors.emails?.[index] as FormikErrors<Email>)?.value
                }
                {...commonInputProps}
              />
              <Form.Select
                fluid
                name={`emails[${index}]["type"]`}
                label="Type"
                options={[...emailOptions]}
                value={values.emails[index].type}
                onChange={(_, { value }) => setFieldValue(`emails[${index}]["type"]`, value)}
              />
            </>
          )}
        </DynamicFormGroupBuilder>
        <Divider hidden />
        <DynamicFormGroupBuilder
          groupName="Addresses"
          itemName="address"
          items={values.addresses}
          onAdd={() => addDynamicItem('addresses')}
          onRemove={id => removeDynamicItem('addresses', id)}
        >
          {(_id, index) => (
            <>
              <Form.TextArea
                name={`addresses[${index}]["value"]`}
                label="Address"
                value={values.addresses[index].value}
                onChange={commonInputProps.onChange}
                onBlur={commonInputProps.onBlur}
                error={
                  touched.addresses?.[index]?.value &&
                  (errors.addresses?.[index] as FormikErrors<Address>)?.value
                }
              />
              <Form.Select
                fluid
                name={`addresses[${index}]["type"]`}
                label="Type"
                options={[...addressOptions]}
                value={values.addresses[index].type}
                onChange={(_, { value }) => setFieldValue(`addresses[${index}]["type"]`, value)}
              />
            </>
          )}
        </DynamicFormGroupBuilder>
      </Form>
    </Ref>
  );
});
