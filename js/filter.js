/* global _:readonly */
import {renderAdverts} from './map.js';

const RERENDER_DELAY = 500;
const mapFilters = document.querySelector('.map__filters');
const housingTypeElement = mapFilters.querySelector('#housing-type');
const housingPriceElement = mapFilters.querySelector('#housing-price');
const housingRoomsElement = mapFilters.querySelector('#housing-rooms');
const housingGuestsElement = mapFilters.querySelector('#housing-guests');
const featuresWifi = mapFilters.querySelector('#filter-wifi');
const featuresDishwasher = mapFilters.querySelector('#filter-dishwasher');
const featuresParking = mapFilters.querySelector('#filter-parking');
const featuresWasher = mapFilters.querySelector('#filter-washer');
const featuresElevator = mapFilters.querySelector('#filter-elevator');
const featuresConditioner = mapFilters.querySelector('#filter-conditioner');

const filterObj = {};

const compare = function (obj) {
  const arrTotal = _.intersectionWith(obj.type, obj.price, obj.rooms, obj.guests, obj.wifi, obj.dishwasher, obj.parking, obj.washer, obj.elevator, obj.conditioner, _.isEqual);
  const deb = _.debounce(() => renderAdverts(arrTotal), RERENDER_DELAY);
  return deb()
};

const generalFilter = function (arr) {
  filterObj.type = arr;
  filterObj.price = arr;
  filterObj.rooms = arr;
  filterObj.guests = arr;
  filterObj.wifi = arr;
  filterObj.dishwasher = arr;
  filterObj.parking = arr;
  filterObj.washer = arr;
  filterObj.elevator = arr;
  filterObj.conditioner = arr;


  housingTypeElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.type = arr.filter(e => e.offer.type == evt.target.value);
    } else {
      filterObj.type = arr;
    }
    compare(filterObj);
  });

  housingPriceElement.addEventListener('change', (evt) => {
    if (evt.target.value == 'middle') {
      filterObj.price = arr.filter(e => e.offer.price >= 10000 && e.offer.price <= 50000);
    } else if (evt.target.value == 'low') {
      filterObj.price = arr.filter(e => e.offer.price < 10000);
    } else if (evt.target.value == 'high') {
      filterObj.price = arr.filter(e => e.offer.price > 50000);
    } else {
      filterObj.price = arr;
    }
    compare(filterObj);
  })

  housingRoomsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.rooms = arr.filter(e => e.offer.rooms == evt.target.value);
    } else {
      filterObj.rooms = arr;
    }
    compare(filterObj);
  });

  housingGuestsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.guests = arr.filter(e => e.offer.guests == evt.target.value);
      console.log(filterObj.guests );
    } else {
      filterObj.guests = arr;
    }
    compare(filterObj);
  });

  featuresWifi.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj.wifi = arr.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj.wifi = arr;
    }
    compare(filterObj);
  });

  featuresDishwasher.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj.dishwasher = arr.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj.dishwasher = arr;
    }
    compare(filterObj);
  });

  featuresParking.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj.parking = arr.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj.parking = arr;
    }
    compare(filterObj);
  });

  featuresWasher.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj.washer = arr.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj.washer = arr;
    }
    compare(filterObj);
  });

  featuresElevator.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj.elevator = arr.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj.elevator = arr;
    }
    compare(filterObj);
  });

  featuresConditioner.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj.conditioner = arr.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj.conditioner = arr;
    }
    compare(filterObj);
  });

};

export {generalFilter}
