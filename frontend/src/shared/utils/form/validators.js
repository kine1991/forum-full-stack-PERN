class Validators {
  constructor(value) {
    this.value = value
    this.errors = []
  }

  isRequired(message) {
    if(this.value.trim() === '' || this.value === null || this.value === undefined) {
      this.errors.push(message);
      return message;
    } else {
      return null;
    }
  }

  minLength(message, minLength){
    if((this.value !== null || this.value !== undefined) && this.value.toString().trim().length < minLength) {
      this.errors.push(message);
      return message;
    } else {
      return null;
    }
  }

  getErrors() {
    return this.errors;
  }
}

export default Validators;