/* global L:readonly */
import {formAddress} from './form.js';

const mapForm = document.querySelectorAll('.ad-form__element');
mapForm.forEach((element) => {
  element.classList.add('ad-form--disabled');
  element.setAttribute('disabled', 'true');
});
const selectMapFilters = document.querySelectorAll('.map__filter');
selectMapFilters.forEach((mapFilter) => {
  mapFilter.classList.add('ad-form--disabled');
  mapFilter.setAttribute('disabled', 'true');
});
const featuresFilters = document.querySelector('.map__features');
featuresFilters.classList.add('ad-form--disabled');
featuresFilters.setAttribute('disabled', 'true');
const activateState = function () {
  mapForm.forEach((element) => {
    element.classList.remove('ad-form--disabled');
    element.removeAttribute('disabled');
  });
  featuresFilters.classList.remove('ad-form--disabled');
  featuresFilters.removeAttribute('disabled');
  selectMapFilters.forEach((mapFilter) => {
    mapFilter.classList.remove('ad-form--disabled');
    mapFilter.removeAttribute('disabled');
  });
  console.log('Карта инициализирована')
};
const LAT_CITY = 35.68950;
const LNG_CITY = 139.69201;
const ZOOM = 10;
const TIME_OUT = 2000;

const map = L.map('map-canvas')
.on('load', () => {
  setTimeout(function(){
      activateState();
  }, TIME_OUT);
})
.setView({
  lat: LAT_CITY,
  lng: LNG_CITY,
}, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: LAT_CITY,
    lng: LNG_CITY,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('drag', (evt) => {
  const coords = evt.target.getLatLng();
  formAddress.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});

const createCustomPopup = function (point) {
  const advTemplate = document.querySelector('#card').content;
  const advCard = advTemplate.cloneNode(true);
  const advElement = advCard.querySelector('.popup');

  advElement.querySelector('.popup__title').textContent = point.offer.title;
  advElement.querySelector('.popup__text--address').textContent = point.offer.address;
  advElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  advElement.querySelector('.popup__type').textContent = point.offer.type;
  advElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  advElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;

  const getFeatures = function () {
    const featuresFragment = document.createDocumentFragment();
    for (let i = 0; i < point.offer.features.length; i++) {
      const newElement = document.createElement('li');
      const newClassFeature = 'popup__feature--' + point.offer.features[i];
      newElement.classList.add('popup__feature', newClassFeature);
      featuresFragment.appendChild(newElement);
    }
    return featuresFragment;
  };
  const featuresList = advElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  featuresList.appendChild(getFeatures(point.offer.features));

  advElement.querySelector('.popup__description').textContent = point.offer.description;

  const getImage = function (arr) {
    const image = advElement.querySelector('.popup__photo');
      if (arr.length == 1) {
        image.setAttribute("src", arr[0]);
      }
        if (arr.length > 1) {
          for (let i = 1; i < arr.length ; i++) {
            image.setAttribute("src", arr[0]);
            const imageClone = image.cloneNode();
            advElement.appendChild(imageClone);
            imageClone.setAttribute("src", arr[i]);
          }
        }
          else if (arr.length == 0) {
            image.classList.add('hidden');
          }
  };
  getImage(point.offer.photos);

  advElement.querySelector('.popup__avatar').setAttribute('src', point.author.avatar);

  return advElement;
};

const renderAdverts = function(similarAds) {
 return similarAds.forEach((point) => {
  const {location} = point;
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
      );
  });
};

export {renderAdverts, LAT_CITY, LNG_CITY, mainPinMarker}
