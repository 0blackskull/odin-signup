class FormValidator {
  constructor (id) {
    this.input = document.querySelector(`.signup-container input#${id}`);
    this.errorElement = document.querySelector(`#${id}+span.error`);

     /* Following this corresponds to class context because we made 
      this callback a arrow function */  
    this.input.addEventListener("input", (event) => this.validate());

    this.clear();
  }


  clear() {
    this.errorElement.textContent = '';
    this.input.setCustomValidity('');
  }
 
  // Abstract
  validate() {
    throw new Error('To be implemented by a subclass');
  }

  /**
   * @description Populates the appropriate error span
   * @param {*} errorMessage Validation error string
   */
  showError (errorMessage) {

    if (!errorMessage || errorMessage.length == 0) {
      this.clear();
      return;
    }

    if (!this.errorElement) return;

    this.errorElement.textContent = '*' + errorMessage; 

    this.errorElement.classList.add('error');

    this.input.setCustomValidity('#');
  }
}

class EmailValidation extends FormValidator {
  constructor () {
    super ('email');
  }

  validate () {
    let errorMessage = '';

    if (this.input.validity.valueMissing || this.input.value.length == 0) {
      errorMessage = 'Please enter email address!';
    } else if (this.input.validity.typeMismatch) {
      errorMessage = 'This needs to be an email address.';
    }

    this.showError(errorMessage);
  }
}

class MobileValidation extends FormValidator {
  constructor () {
    super ('mobile');
  }

  validate () {
    let errorMessage = '';

    if (this.input.value.length === 0) {
      errorMessage = 'Can we have your number?';
    } else if (this.input.value.length !== 10) {
      errorMessage = '10 digit numbers';
    }

    this.showError(errorMessage);
  }
}

class FirstnameValidation extends FormValidator {
  constructor () {
    super ('first-name');
  }

  validate () {
    let errorMessage = '';

    if (this.input.value.length === 0) {
      errorMessage = 'And you are..?!';
    }

    this.showError(errorMessage);
  }
}

class PasswordValidation extends FormValidator {
  constructor () {
    super ('password');
  }

  validate () {

    let errorMessage = '';

    if (this.input.value.length === 0) {
      errorMessage = 'Set a secure password!';
    }

    this.showError(errorMessage);
  }
}

class ConfirmPasswordValidation extends FormValidator {
  constructor () {
    super ('confirm-password');
    this.passwordElement = document.getElementById('password');
  }

  validate () {

    let errorMessage = '';

    if (this.passwordElement.value != this.input.value) {
      errorMessage = 'Must match password!'
    }

    this.showError(errorMessage);
  }
}

function main () {

  const form = document.querySelector('div.signup-container form');

  const validations = [
    new EmailValidation(),
    new FirstnameValidation(),
    new MobileValidation(),
    new PasswordValidation(),
    new ConfirmPasswordValidation()
  ];

  form.addEventListener("submit",  (event) => {
  
    validations.forEach(validator => validator.validate());

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const formDataEntries = Array.from(formData.entries());
      console.table(formDataEntries);
    } else {
      console.warn('Invalid form values');
    }

    event.preventDefault();
  });
}

main();