function createCalendar() {
  flatpickr('.implementDate');
  var myDate = new Date();
  var myDateString;

  myDateString =
    myDate.getFullYear() +
    '-' +
    ('0' + (myDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + myDate.getDate()).slice(-2);

  document.querySelector('#implementationDate').value = myDateString;
}

createCalendar();

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const items = contactForm.querySelectorAll('.cf-item');
  const formItems = contactForm.querySelectorAll('.cf-input');

  const resetForm = function() {
    for (let i = 0; i < items.length; i++) {
      const errors = items[i].querySelectorAll('.cf-error');
      formItems[i].classList.remove('cf-error');
      formItems[i].classList.remove('cf-error-border');
      for (let j = 0; j < errors.length + 1; j++) {
        if (errors[j]) {
          items[i].removeChild(errors[j]);
        }
      }
    }
  };

  const firstName = formItems[0];
  const lastName = formItems[1];
  const email = formItems[2];
  const phone = formItems[3];
  const function1 = formItems[4];
  const function2 = formItems[5];
  const function3 = formItems[6];
  const function4 = formItems[7];
  const date = formItems[8];
  const details = formItems[9];

  const injectData = function(input, message) {
    input.classList.add('cf-error-border');
    input.insertAdjacentHTML(
      'afterend',
      '<span class="cf-error">' + message + '</span>'
    );
  };

  const required = function() {
    const validate = [firstName, lastName, email, phone, date];

    for (let i = 0; i < validate.length; i++) {
      if (!validate[i].value) {
        injectData(validate[i], 'Required Field');
      }
    }
  };

  function emailValidation() {
    const emailRegEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEX.test(email.value)) {
      injectData(email, 'Invalid Email Address');
    }
  }

  function phoneValidation() {
    const phoneRegEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    if (!phoneRegEX.test(phone.value)) {
      injectData(phone, 'Invalid Phone Number');
    }
  }

  function dateValidation() {
    const test = new Date(date.value);
    console.log(test);
    const inputDate = new Date(date.value).getTime();
    const currentDate = new Date().getTime();

    if (inputDate < currentDate) {
      injectData(date, 'Please select date in the future' + ' ');
    }
  }

  resetForm();
  required();
  emailValidation();
  phoneValidation();
  dateValidation();
});
