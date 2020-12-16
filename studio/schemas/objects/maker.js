import React from 'react';
import useCustomForm from '../CustomForm/useCustomForm';
import { FormCard } from './styles';

const initialValues = {
  name: '',
  lastName: '',
  age: 0,
};

const UserIntakeForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCustomForm({
    initialValues,
    onSubmit: (values) => console.log({ values }),
  });

  return (
    <FormCard>
      <form onSubmit={handleSubmit} className="App">
        <h1>Custom Forms with Hooks</h1>

        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={values.name}
        />
        <br />

        <label>Lastname</label>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
        />
        <br />

        <label>Age</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={values.age}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </FormCard>
  );
};

export { UserIntakeForm };
