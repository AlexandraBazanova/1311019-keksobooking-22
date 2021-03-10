/* global L:readonly */
import {createCustomPopup} from './create-popup.js';
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

const LAT_CITY = 35.68940;
const LNG_CITY = 139.69201;
const ZOOM = 10;
const TIME_OUT = 2000;
const markers = [];

const map = L.map('map-canvas')
  .on('load', () => {
    setTimeout(function () {
      activateState();
    }, TIME_OUT);
  })
  .setView({
    lat: LAT_CITY,
    lng: LNG_CITY,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: LAT_CITY,
  lng: LNG_CITY,
}, {
  draggable: true,
  icon: mainPinIcon,
}, );

mainPinMarker.addTo(map);

mainPinMarker.on('drag', (evt) => {
  const coords = evt.target.getLatLng();
  formAddress.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});


const ADVERTS_COUNT = 10;

const renderAdverts = function (similarAds) {
  markers.forEach(e => e.remove());
  return similarAds
  .slice(0, ADVERTS_COUNT)
  .forEach((point) => {
    const {
      location
    } = point;

    const icon = L.icon({
      iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const markerPin = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
       {
        icon,
       });

    markerPin
      .addTo(map)
      .bindPopup(
        createCustomPopup(point),
        {
          keepInView: true,
        },
      );

    markers.push(markerPin)
  });
};

const mapFilters = document.querySelector('.map__filters');
const housingTypeElement = mapFilters.querySelector('#housing-type');
const housingPriceElement = mapFilters.querySelector('#housing-price');
const housingRoomsElement = mapFilters.querySelector('#housing-rooms');
const housingGuestsElement = mapFilters.querySelector('#housing-guests');

const filterType = function (arr) {
  housingTypeElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      renderAdverts(arr.filter(e => e.offer.type == evt.target.value))
    } else {
      renderAdverts(arr)
    }
  });
};

const filterPrice = function (arr) {
  housingPriceElement.addEventListener('change', (evt) => {
    if (evt.target.value == 'middle') {
      renderAdverts(arr.filter(e => e.offer.price >= 10000 && e.offer.price <= 50000))
    } else if (evt.target.value == 'low') {
      renderAdverts(arr.filter(e => e.offer.price < 10000))
    } else if (evt.target.value == 'high') {
      renderAdverts(arr.filter(e => e.offer.price > 50000))
    } else {
      renderAdverts(arr)
    }
  });
};

const filterRooms = function (arr) {
  housingRoomsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      renderAdverts(arr.filter(e => e.offer.rooms == evt.target.value))
    } else {
      renderAdverts(arr)
    }
  });
};

const filterGuests = function (arr) {
  housingGuestsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      renderAdverts(arr.filter(e => e.offer.guests == evt.target.value))
    } else {
      renderAdverts(arr)
    }
  });
};

const housingFeaturesElements = mapFilters.querySelectorAll('[name="features"]');

const filterFeatures = function (arr) {
  housingFeaturesElements.forEach((element) => {

  element.addEventListener('change', (evt) => {
    console.log(evt.target.checked);
    if(evt.target.checked) {
    renderAdverts(arr.filter(e => e.offer.features.includes(evt.target.value) ))
    } else {
      renderAdverts(arr)
    }
  });
});
};



export {renderAdverts, LAT_CITY, LNG_CITY, mainPinMarker, filterType, filterPrice, filterRooms, filterGuests, filterFeatures}
