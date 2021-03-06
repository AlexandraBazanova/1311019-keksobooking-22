/* global L:readonly */
import {APPARTMENTS} from './create-popup.js';
import {showErrorAlert, showSuccessAlert} from './utils.js';
import {sendData, advertisments} from './api.js';
import {LAT_CITY, LNG_CITY, mainPinMarker, renderAdverts} from './map.js';
import {mapFilters} from './filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const ROOMS = ['1', '2', '3'];
const TEXTCONTENTS = ['для 3 гостей', 'для 2 гостей', 'для 1 гостя', 'не для гостей'];
const TGUESTS = ['3', '2', '1', '0'];
const IMAGES = ['gif', 'jpg', 'jpeg', 'png'];
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

formMinPrice.setAttribute('placeholder', APPARTMENTS.flat.price);
formMinPrice.setAttribute('min', APPARTMENTS.flat.price);
formApartmentType.addEventListener('change', function (evt) {
  const priceOfApart = APPARTMENTS[evt.target.value].price
  formMinPrice.setAttribute('placeholder', priceOfApart);
  formMinPrice.setAttribute('min', priceOfApart);
});

formMinPrice.addEventListener('blur', function (evt) {
  const placeholder = formMinPrice.getAttribute('placeholder');
  formMinPrice.removeAttribute('style');
  if (parseInt(evt.target.value) < parseInt(placeholder)) {
    formMinPrice.setAttribute('style', 'border: 1px solid red');
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
  if (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH) {
    formTitle.setAttribute('style', 'border: 1px solid red');
  }
});

formCapacity[0].setAttribute('disabled', 'true');
formCapacity[1].setAttribute('disabled', 'true');
formCapacity[3].setAttribute('disabled', 'true');

const createOptions = function(firstItem, lastItem) {
  const guestFragment = document.createDocumentFragment();
  for (let i = firstItem; i <= lastItem; i++) {
    const newEl = document.createElement('option');
    newEl.setAttribute('value', TGUESTS[i]);
    newEl.innerHTML = TEXTCONTENTS[i];
    guestFragment.appendChild(newEl);
    formCapacity.appendChild(guestFragment)
  }
};
formRoomNumber.addEventListener('change', ()  => {
  formCapacity.textContent = '';
  formRoomNumber.value === ROOMS[0]? (
    createOptions(2, 2)
  ):
    formRoomNumber.value === ROOMS[1]? (
      createOptions(1, 2)
    ) :
      formRoomNumber.value === ROOMS[2]? (
        createOptions(0, 2)
      ) : (
        createOptions(3, 3)
      )
});

formAddress.value = `${LAT_CITY}, ${LNG_CITY}`;

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMAGES.some((it) => {
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
  const matches = IMAGES.some((it) => {
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

const clearForm = function(){
  advertForm.reset();
  formMinPrice.setAttribute('placeholder', APPARTMENTS.flat.price);
  formMinPrice.setAttribute('min', APPARTMENTS.flat.price);
  formCapacity.innerHTML = '';
  createOptions(2, 2);
  avatarPreview.setAttribute('src', 'img/muffin-grey.svg');
  imgFlatPreview.setAttribute('src', 'img/muffin-grey.svg');
  const latlng = L.latLng(LAT_CITY, LNG_CITY);
  mainPinMarker.setLatLng(latlng);
  formAddress.value = `${latlng.lat}, ${latlng.lng}`;
  mapFilters.reset();
  renderAdverts(advertisments);
};

const clickOnReset = function(){
  resetForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearForm();
  });
};
clickOnReset();

const submitAd = function(){
  showSuccessAlert('Ваше объявление успешно размещено!');
  clearForm();
};

const setUserFormSubmit = function(onSuccess){
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      onSuccess,
      () => showErrorAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit, formAddress, submitAd};

