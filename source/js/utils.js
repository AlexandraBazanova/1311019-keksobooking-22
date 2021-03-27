const ESC = 27;
const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content;
const contentSuccessTemplate = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const contentErrorTemplate = errorTemplate.querySelector('.error');

const setMessageCallbacks = (message) => {

  const onMessageClick = function(){
    message.remove();
    document.removeEventListener('click', setMessageCallbacks);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  const onMessageEscPress = function(evt){
    if (evt.keyCode === ESC) {
      message.remove();
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', setMessageCallbacks);
    }
  };

  document.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscPress);
};

const showErrorAlert = (message) => {
  const alertContainer = contentErrorTemplate.cloneNode(true);
  const errorMessage = alertContainer.querySelector('.error__message');
  errorMessage.textContent = message;
  alertContainer.style.zIndex = 600;
  main.append(alertContainer);
  setMessageCallbacks(alertContainer);
};

const showSuccessAlert = (message) => {
  const successContainer = contentSuccessTemplate.cloneNode(true);
  const successMessage = successContainer.querySelector('.success__message');
  successMessage.textContent = message;
  successContainer.style.zIndex = 600;
  main.append(successContainer);
  setMessageCallbacks(successContainer);
};

export {showErrorAlert, showSuccessAlert};
