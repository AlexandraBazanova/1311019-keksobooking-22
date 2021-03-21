/* global _:readonly */
import {renderAdverts} from './map.js';

const RERENDER_DELAY = 500;
const MIN_BORDER_PRICE = 10000;
const MAX_BORDER_PRICE = 50000;
const FilterPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};
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

const compare = function(obj, arr) {
  let filteredArr = [];
  const getFilteredArr = function (ad) {
    if (obj.type.includes(ad)
    && obj.price.includes(ad)
    && obj.rooms.includes(ad)
    && obj.guests.includes(ad)
    && obj.features.includes(ad)) {
      filteredArr.push(ad);
    }
  };
  getFilteredArr(arr.forEach(ad => getFilteredArr(ad)))
  const debounceAds = _.debounce(() => renderAdverts(filteredArr), RERENDER_DELAY);
  return debounceAds()
};

const getFilteredAdverts = function(arr) {
  filterObj.type = arr;
  filterObj.price = arr;
  filterObj.rooms = arr;
  filterObj.guests = arr;
  filterObj.features = arr;
  filterObj.wifi = arr;
  filterObj.dishwasher = arr;
  filterObj.parking = arr;
  filterObj.washer = arr;
  filterObj.elevator = arr;
  filterObj.conditioner = arr;

  housingTypeElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.type = arr.filter(e => e.offer.type === evt.target.value);
    } else {
      filterObj.type = arr;
    }
    compare(filterObj, arr);
  });

  housingPriceElement.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case FilterPrice.MIDDLE:
        filterObj.price = arr.filter(e => e.offer.price >= MIN_BORDER_PRICE && e.offer.price <= MAX_BORDER_PRICE);
        break;
      case FilterPrice.LOW:
        filterObj.price = arr.filter(e => e.offer.price < MIN_BORDER_PRICE);
        break;
      case FilterPrice.HIGH:
        filterObj.price = arr.filter(e => e.offer.price > MAX_BORDER_PRICE);
        break;
      default:
        filterObj.price = arr;
    }
    compare(filterObj, arr);
  });

  housingRoomsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.rooms = arr.filter(e => e.offer.rooms === parseInt(evt.target.value));
    } else {
      filterObj.rooms = arr;
    }
    compare(filterObj, arr);
  });

  housingGuestsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.guests = arr.filter(e => e.offer.guests === parseInt(evt.target.value));
    } else {
      filterObj.guests = arr;
    }
    compare(filterObj, arr);
  });

  const listenFeatures =function(domElement, feature) {
    domElement.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        filterObj[feature] = arr.filter(e => e.offer.features.includes(evt.target.value));
      } else {
        filterObj[feature] = arr;
      }
      compareFeatures(filterObj);
      compare(filterObj, arr);
    });
  };

  listenFeatures(featuresWifi,  'wifi');
  listenFeatures(featuresDishwasher, 'dishwasher');
  listenFeatures(featuresParking, 'parking');
  listenFeatures(featuresWasher, 'washer');
  listenFeatures(featuresElevator, 'elevator');
  listenFeatures(featuresConditioner, 'conditioner');

  const compareFeatures = function(obj) {
    let arrFeatures = [];
    const getFilteredFeatures = function(ad) {
      if (obj.wifi.includes(ad)
        && obj.dishwasher.includes(ad)
        && obj.parking.includes(ad)
        && obj.washer.includes(ad)
        && obj.elevator.includes(ad)
        && obj.conditioner.includes(ad)) {
          arrFeatures.push(ad);
        }
      };
    getFilteredFeatures(arr.forEach(ad => getFilteredFeatures(ad)));
    obj.features = arrFeatures;
  };

};

export {mapFilters, getFilteredAdverts}




