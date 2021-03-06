/* global L:readonly */
import {createCustomPopup} from './create-popup.js';
import {formAddress} from './form.js';

const LAT_CITY = 35.68950;
const LNG_CITY = 139.69171;
const ZOOM = 10;
const TIME_OUT = 2000;
const ADVERTS_COUNT = 10;
const DIGITS_AFT_DECIMAL_POINT = 5;
const SIZES = [52, 52];
const ANCHORS = [26, 52];
const PINS = [40, 40];
const COORDS = [20, 40];
const MAIN_ICON_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
const PIN_ICON_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
const markers = [];
const mapForm = document.querySelectorAll('.ad-form__element');
const selectMapFilters = document.querySelectorAll('.map__filter');
const featuresFilters = document.querySelector('.map__features');

mapForm.forEach((element) => {
  element.classList.add('ad-form--disabled');
  element.setAttribute('disabled', 'true');
});
selectMapFilters.forEach((mapFilter) => {
  mapFilter.classList.add('ad-form--disabled');
  mapFilter.setAttribute('disabled', 'true');
});
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
};

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
  iconUrl: MAIN_ICON_URL,
  iconSize: SIZES,
  iconAnchor: ANCHORS,
});

const mainPinMarker = L.marker({
  lat: LAT_CITY,
  lng: LNG_CITY,
}, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

mainPinMarker.on('drag', (evt) => {
  const coords = evt.target.getLatLng();
  formAddress.value = `${coords.lat.toFixed(DIGITS_AFT_DECIMAL_POINT)}, ${coords.lng.toFixed(DIGITS_AFT_DECIMAL_POINT)}`;
});

const renderAdverts = function (advertisments) {
  markers.forEach(e => e.remove());
  return advertisments
    .slice(0, ADVERTS_COUNT)
    .forEach((point) => {
      const {location} = point;
      const icon = L.icon({
        iconUrl: PIN_ICON_URL,
        iconSize: PINS,
        iconAnchor: COORDS,
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

export {renderAdverts, LAT_CITY, LNG_CITY, mainPinMarker, markers, map}
