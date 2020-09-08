import { useState, useEffect } from 'react';

const useForm = (initialState, validate, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({
      ...values,
      ...initialState
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState, setValues]);
  
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