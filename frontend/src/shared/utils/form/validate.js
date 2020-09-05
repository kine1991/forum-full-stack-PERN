export default function validate(values) {
  let errors = {};
  // Name Errors
  if (!values.name) {
    errors.name = "Required Name";
  } else if (values.name.length < 4) {
    errors.name = "Name must be at least 4 characters";
  }
  // Description Errors
  if (!values.description) {
    errors.description = "Required Description";
  } else if (values.description.length < 6) {
    errors.description = "Description must be at least 6 characters";
  }
  
  // Image Url Errors
  if (!values.imageUrl) {
    errors.imageUrl = "Required Image Url";
  } else if (values.imageUrl.length < 6) {
    errors.imageUrl = "Image Url must be at least 6 characters";
  }

  // // Email Errors
  // if (!values.email) {
  //   errors.email = "Required Email";
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //   errors.email = "Invalid email address";
  // }
  // // Password Errors
  // if (!values.password) {
  //   errors.password = "Required Password";
  // } else if (values.password.length < 6) {
  //   errors.password = "Password must be at least 6 characters";
  // }
  return errors;
}
