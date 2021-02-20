import {TYPES_OF_APPARTMENTS} from './data.js';

const apartmentTypes = document.querySelector('#type');
const formMinPrice = document.querySelector('#price');

apartmentTypes.addEventListener('change', function (evt) {
  const elOfApart = TYPES_OF_APPARTMENTS.filter(e => e.en === evt.target.value)[0].minPrice;
  formMinPrice.setAttribute('placeholder', elOfApart);
});

formMinPrice.addEventListener('blur', function (evt) {
 const placeholder = formMinPrice.getAttribute('placeholder');
 formMinPrice.removeAttribute('style');
  if (parseInt(evt.target.value) < parseInt(placeholder)) {
    formMinPrice.setAttribute('style', 'border: 1px solid red');
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


//******Задание Помощь друга (часть 2)******/

const formTitle = document.querySelector('#title');

formTitle.addEventListener('input', () => {
  formTitle.removeAttribute('style');
  const titleLength = formTitle.value.length;
   if (titleLength < 30 || titleLength > 100) {
    formTitle.setAttribute('style', 'border: 1px solid red');
   }
 });

const GUEST_TEXTCONTENT = ['для 3 гостей', 'для 2 гостей', 'для 1 гостя', 'не для гостей'];
const GUEST_VALUE = ['3', '2', '1', '0'];
const formRoomNumber = document.querySelector('#room_number');
const formCapacity = document.querySelector('#capacity');

formRoomNumber.addEventListener('change', ()  => {
  formCapacity.innerHTML = "";
  const foo = function(e, k) {
    const guestFragment = document.createDocumentFragment();
      for (let i = e; i <=k; i++) {
      const newEl = document.createElement('option');
      newEl.setAttribute('value', GUEST_VALUE[i]);
      newEl.innerHTML = GUEST_TEXTCONTENT[i];
      guestFragment.appendChild(newEl);
      formCapacity.appendChild(guestFragment)
      }
  };

    formRoomNumber.value == 1 ? (
      foo(2, 2),
      console.log()
    ):
      formRoomNumber.value == 2 ? (
        foo(1, 2)
      ) :
        formRoomNumber.value == 3 ? (
          foo(0, 2)
        ) : (
          foo(3, 3)
        )
});
