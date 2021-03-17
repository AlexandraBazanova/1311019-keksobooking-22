/* global L:readonly */

import {TYPES_OF_APPARTMENTS} from './data.js';
import {showAlert} from './utils.js';
import {sendData} from './api.js';
import {LAT_CITY, LNG_CITY, mainPinMarker} from './map.js';

const GUEST_TEXTCONTENTS = ['для 3 гостей', 'для 2 гостей', 'для 1 гостя', 'не для гостей'];
const GUEST_VALUES = ['3', '2', '1', '0'];
const IMG_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const advertForm = document.querySelector('.ad-form');
const formApartmentType = document.querySelector('#type');
const formMinPrice = document.querySelector('#price');
const formTimeIn = document.querySelector('#timein');
const formTimeOut = document.querySelector('#timeout');
const formTitle = document.querySelector('#title');
const formRoomNumber = document.querySelector('#room_number');
const formCapacity = document.querySelector('#capacity');
const formAddress = document.querySelector('#address');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imgFlatChooser = document.querySelector('.ad-form__upload input[type=file]');
const imgFlatPreview = document.querySelector('.ad-form__photo img');
const resetForm = document.querySelector('.ad-form__reset');

formApartmentType.addEventListener('change', function (evt) {
  const elOfApart = TYPES_OF_APPARTMENTS[evt.target.value].price
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

formTimeIn.addEventListener('change', () => {
  formTimeOut.value = formTimeIn.value;
});

formTimeOut.addEventListener('change', () => {
  formTimeIn.value = formTimeOut.value;
});

formTitle.addEventListener('input', () => {
  formTitle.removeAttribute('style');
  const titleLength = formTitle.value.length;
   if (titleLength < 30 || titleLength > 100) {
    formTitle.setAttribute('style', 'border: 1px solid red');
   }
 });

formRoomNumber.addEventListener('change', ()  => {
  formCapacity.innerHTML = "";
  const createOptions = function(firstItem, lastItem) {
    const guestFragment = document.createDocumentFragment();
      for (let i = firstItem; i <= lastItem; i++) {
      const newEl = document.createElement('option');
      newEl.setAttribute('value', GUEST_VALUES[i]);
      newEl.innerHTML = GUEST_TEXTCONTENTS[i];
      guestFragment.appendChild(newEl);
      formCapacity.appendChild(guestFragment)
      }
  };
    formRoomNumber.value === '1' ? (
      createOptions(2, 2)
    ):
      formRoomNumber.value === '2' ? (
        createOptions(1, 2)
      ) :
        formRoomNumber.value === '3' ? (
          createOptions(0, 2)
        ) : (
          createOptions(3, 3)
        )
});

formAddress.value = `${LAT_CITY}, ${LNG_CITY}`;

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMG_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

imgFlatChooser.addEventListener('change', () => {
  const file = imgFlatChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMG_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgFlatPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

const clearForm = (evt) => {
  evt? evt.preventDefault(): '';
  advertForm.reset();
  avatarPreview.setAttribute('src', 'img/muffin-grey.svg');
  imgFlatPreview.setAttribute('src', 'img/muffin-grey.svg');
  const latlng = L.latLng(LAT_CITY, LNG_CITY);
  mainPinMarker.setLatLng(latlng);
  formAddress.value = `${latlng.lat}, ${latlng.lng}`;
};
resetForm.addEventListener('click', clearForm);

const setUserFormSubmit = (onSuccess) => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      onSuccess,
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
      );
    });
  };

  export {setUserFormSubmit, formAddress, clearForm};
