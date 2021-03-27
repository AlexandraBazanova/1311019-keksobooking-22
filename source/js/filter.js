/* global _:readonly */
import {renderAdverts} from './map.js';
import {advertisments} from './api.js';

const RERENDER_DELAY = 500;
const MIN_BORDER_PRICE = 10000;
const MAX_BORDER_PRICE = 50000;
const FilterPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
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

const compare = function (obj, adverts) {
  let filters = [];
  const getFilteredArr = function (ad) {
    if (obj.type.includes(ad) &&
      obj.price.includes(ad) &&
      obj.rooms.includes(ad) &&
      obj.guests.includes(ad) &&
      obj.features.includes(ad)) {
      filters.push(ad);
    }
  };
  getFilteredArr(adverts.forEach(ad => getFilteredArr(ad)))
  renderAdverts(filters)
};

const filterOutType = function () {
  housingTypeElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.type = advertisments.filter(e => e.offer.type === evt.target.value);
    } else {
      filterObj.type = advertisments;
    }
  });
};

const filterOutPrice = function () {
  housingPriceElement.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case FilterPrice.MIDDLE:
        filterObj.price = advertisments.filter(e => e.offer.price >= MIN_BORDER_PRICE && e.offer.price <= MAX_BORDER_PRICE);
        break;
      case FilterPrice.LOW:
        filterObj.price = advertisments.filter(e => e.offer.price < MIN_BORDER_PRICE);
        break;
      case FilterPrice.HIGH:
        filterObj.price = advertisments.filter(e => e.offer.price > MAX_BORDER_PRICE);
        break;
      default:
        filterObj.price = advertisments;
    }
  });
};

const filterOutRooms = function () {
  housingRoomsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.rooms = advertisments.filter(e => e.offer.rooms === parseInt(evt.target.value));
    } else {
      filterObj.rooms = advertisments;
    }
  });
};

const filterOutGuests = function () {
  housingGuestsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.guests = advertisments.filter(e => e.offer.guests === parseInt(evt.target.value));
    } else {
      filterObj.guests = advertisments;
    }
  });
};

const listenFeatures = function (domElement, feature) {
  domElement.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj[feature] = advertisments.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj[feature] = advertisments;
    }
    compareFeatures(filterObj);
  });
};

const compareFeatures = function (obj) {
  let advertsFeatures = [];
  const getFilteredFeatures = function (ad) {
    if (obj.wifi.includes(ad) &&
      obj.dishwasher.includes(ad) &&
      obj.parking.includes(ad) &&
      obj.washer.includes(ad) &&
      obj.elevator.includes(ad) &&
      obj.conditioner.includes(ad)) {
      advertsFeatures.push(ad);
    }
  };
  getFilteredFeatures(advertisments.forEach(ad => getFilteredFeatures(ad)));
  obj.features = advertsFeatures;
};

filterOutType();
filterOutPrice();
filterOutRooms();
filterOutGuests();
listenFeatures(featuresWifi, 'wifi');
listenFeatures(featuresDishwasher, 'dishwasher');
listenFeatures(featuresParking, 'parking');
listenFeatures(featuresWasher, 'washer');
listenFeatures(featuresElevator, 'elevator');
listenFeatures(featuresConditioner, 'conditioner');

const renderFilteredAdverts = function (advertisments) {
  filterObj.type =
  filterObj.price =
  filterObj.rooms =
  filterObj.guests =
  filterObj.features =
  filterObj.wifi =
  filterObj.dishwasher =
  filterObj.parking =
  filterObj.washer =
  filterObj.elevator =
  filterObj.conditioner = advertisments;

  mapFilters.addEventListener('change', (evt) => {
    switch (evt.target) {
      case housingTypeElement:
        filterOutType();
        break;
      case housingPriceElement:
        filterOutPrice();
        break;
      case housingRoomsElement:
        filterOutRooms();
        break;
      case housingGuestsElement:
        filterOutGuests();
        break;
      case featuresWifi:
        listenFeatures(featuresWifi, 'wifi');
        break;
      case featuresDishwasher:
        listenFeatures(featuresDishwasher, 'dishwasher');
        break;
      case featuresParking:
        listenFeatures(featuresParking, 'parking');
        break;
      case featuresWasher:
        listenFeatures(featuresWasher, 'washer');
        break;
      case featuresElevator:
        listenFeatures(featuresElevator, 'elevator');
        break;
      case featuresConditioner:
        listenFeatures(featuresConditioner, 'conditioner');
        break;
    }
    const debounceAds = _.debounce(() => compare(filterObj, advertisments), RERENDER_DELAY);
    return debounceAds()
  });
};

export {mapFilters, renderFilteredAdverts};
