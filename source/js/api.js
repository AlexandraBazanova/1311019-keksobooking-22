const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://22.javascript.pages.academy/keksobooking';
let advertisments = [];

const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((adverts) => {
      advertisments = adverts;
      onSuccess(advertisments);
    })
    .catch(() => {
      onFail('Не удалось получить данные');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму! Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму1 Попробуйте ещё раз');
    });
};

export {getData, sendData, advertisments};
