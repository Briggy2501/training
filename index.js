function createCalendar() {
    flatpickr(".implementDate");
    var myDate = new Date();
    var myDateString;
  
    myDateString = myDate.getFullYear() + '-' + ('0' + (myDate.getMonth()+1)).slice(-2) + '-' + ('0' +  myDate.getDate()).slice(-2) ;
  
  
    document.querySelector("#implementationDate").value = myDateString;
  }
  
  createCalendar();
  
  
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
      input.style.borderColor = '#ff0000';
      const injectMessage = document.createElement('span');
      injectMessage.classList.add('cf-error');
      injectMessage.innerHTML = message;
      input.parentNode.insertBefore(injectMessage, input);
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
      const test = new Date(date.value);
      console.log(test);
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