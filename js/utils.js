const ESC = 27;
const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content;
const contentSuccessTemplate = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const contentErrorTemplate = errorTemplate.querySelector('.error');


const closeMessage = (messageError) => {
  messageError.addEventListener('click', () => {
    messageError.remove();
  });
  const closeEsc = function(evt){
    if (evt.keyCode === ESC) {
      messageError.remove();
    }
    document.removeEventListener('keydown', closeEsc);
  };
  document.addEventListener('keydown', closeEsc);
};

const showErrorAlert = (message) => {
  const alertContainer = contentErrorTemplate.cloneNode(true);
  const errorMessage = alertContainer.querySelector('.error__message');
  errorMessage.textContent = message;
  alertContainer.style.zIndex = 600;
  main.append(alertContainer);
  closeMessage(alertContainer);
};

const showSuccessAlert = (message) => {
  const successContainer = contentSuccessTemplate.cloneNode(true);
  const successMessage = successContainer.querySelector('.success__message');
  successMessage.textContent = message;
  successContainer.style.zIndex = 600;
  main.append(successContainer);
  closeMessage(successContainer);
};

export {showErrorAlert, showSuccessAlert};
