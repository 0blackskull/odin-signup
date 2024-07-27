class FormValidator {
  constructor (id) {
    this.input = document.querySelector(`.signup-container input#${id}`);
    this.errorElement = document.querySelector(`#${id}+span.error`);
    this.initiate();
  }

  initiate() {
    this.input.addEventListener("input", (event) => {
      /* Following this corresponds to class context because we made 
      this callback a arrow function */
      if (this.input.validity.valid) {
        console.log('I am valid');
        this.errorElement.textContent = '';
      } else {
        this.validate();
      }
    });
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

    if (errorMessage.length == 0) return;

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

    if (this.input.validity.valueMissing) {
      errorMessage = 'Please enter email address!';
    } else if (this.input.validity.typeMismatch) {
      errorMessage = 'Entered value needs to be an email address.';
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

    if (this.input.validity.valueMissing) {
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

    if (this.input.validity.valueMissing) {
      errorMessage = 'And you are..?!';
    }

    this.showError(errorMessage);
  }
}

function main () {

  const form = document.querySelector('div.signup-container form');

  const validations = [
    new EmailValidation(),
    new FirstnameValidation(),
    new MobileValidation()
  ];

  form.addEventListener("submit", function (event) {
  
    validations.forEach(validator => validator.validate());

    event.preventDefault();
  })
}

main();