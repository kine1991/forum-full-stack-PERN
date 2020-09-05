import { useState } from 'react';

const useForm = (initialState, validate, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length === 0) {
      callback();
    }
  }

  return { 
    values,
    errors,
    handleChange,
    handleSubmit
  }
}

export default useForm;