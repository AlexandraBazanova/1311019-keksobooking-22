import {TYPES_OF_APPARTMENTS} from './data.js';

const apartmentTypes = document.querySelector('#type');
const formMinPrice = document.querySelector('#price');

apartmentTypes.addEventListener('change', function (evt) {
  const elOfApart = TYPES_OF_APPARTMENTS.filter(e => e.en === evt.target.value)[0].minPrice;
  formMinPrice.setAttribute('placeholder', elOfApart);
});

formMinPrice.addEventListener('blur', function (evt) {
 const placeholder = formMinPrice.getAttribute('placeholder');
  if (parseInt(evt.target.value) < parseInt(placeholder)) {
    alert('Значение поля «Цена за ночь» меньше минимально допустимого');
  }
});

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});


