/* Set Date to Current Date */
Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

document.getElementById('implementationDate').value = new Date().toDateInputValue();

/* Contact Form Validation */

const getForm = document.querySelector('.contact-form');

getForm.addEventListener('submit', function(e){
  e.preventDefault();

  const items = getForm.querySelectorAll('.cf-item');
  const formItems = getForm.querySelectorAll('.cf-input');

  const resetForm = function() {
    for (i = 0; i < items.length; i++) {
      formItems[i].style.borderColor = '#ccc';
      const errors = items[i].querySelectorAll('.cf-error');
      for(j = 0; j < errors.length+1; j++) {
        if(errors[j]) {
          items[i].removeChild(errors[j]);
        }

      }

    }
  }


  const [firstName, lastName, email, phone, function1, function2, function3, function4, date, details] = formItems;



  const injectData = function(input, message) {
    input.style.borderColor = '#ff0000';
    const injectMessage = document.createElement('span');
    injectMessage.classList.add('cf-error');
    injectMessage.innerHTML = message;
    input.after(injectMessage);
  }

  const required = function() {
    const validate = [firstName, lastName, email, phone, date];

    for (i = 0; i < validate.length; i++) {
      if (!validate[i].value) {
        injectData(validate[i], 'Required Field*');
      }

    }
  }

  function emailValidation() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email.value)) {
      injectData(email, 'Invalid Email Address')
    }
  }

  function phoneValidation() {
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    if(!re.test(phone.value)) {
      injectData(phone, 'Invalid Phone Number')
    }
  }

  function dateValidation() {
    const inputDate = new Date(date.value).getTime();
    const currentDate = new Date().getTime();

    if (inputDate < currentDate) {
      injectData(date, 'Please select date in the future' + ' ')
    }
  }

  resetForm();
  required();
  emailValidation();
  phoneValidation();
  dateValidation();

});
