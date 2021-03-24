/* global _:readonly */
import {renderAdverts} from './map.js';

const RERENDER_DELAY = 500;
const MIN_BORDER_PRICE = 10000;
const MAX_BORDER_PRICE = 50000;
const FilterPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};
const savedAdverts = [];

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

const setFilterAdverts = function(adverts){
  return adverts.forEach(item => savedAdverts.push(item))
};

const compare = function (obj, adverts) {
  let filteredAdverts = [];
  const getFilteredArr = function (ad) {
    if (obj.type.includes(ad) &&
      obj.price.includes(ad) &&
      obj.rooms.includes(ad) &&
      obj.guests.includes(ad) &&
      obj.features.includes(ad)) {
      filteredAdverts.push(ad);
    }
  };
  getFilteredArr(adverts.forEach(ad => getFilteredArr(ad)))
  renderAdverts(filteredAdverts)
};

const filterhousingType = function () {
  housingTypeElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.type = savedAdverts.filter(e => e.offer.type === evt.target.value);
    } else {
      filterObj.type = savedAdverts;
    }
  });
};

const filterhousingPrice = function () {
  housingPriceElement.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case FilterPrice.MIDDLE:
        filterObj.price = savedAdverts.filter(e => e.offer.price >= MIN_BORDER_PRICE && e.offer.price <= MAX_BORDER_PRICE);
        break;
      case FilterPrice.LOW:
        filterObj.price = savedAdverts.filter(e => e.offer.price < MIN_BORDER_PRICE);
        break;
      case FilterPrice.HIGH:
        filterObj.price = savedAdverts.filter(e => e.offer.price > MAX_BORDER_PRICE);
        break;
      default:
        filterObj.price = savedAdverts;
    }
  });
};

const filterhousingRooms = function () {
  housingRoomsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.rooms = savedAdverts.filter(e => e.offer.rooms === parseInt(evt.target.value));
    } else {
      filterObj.rooms = savedAdverts;
    }
  });
};

const filterhousingGuests = function () {
  housingGuestsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.guests = savedAdverts.filter(e => e.offer.guests === parseInt(evt.target.value));
    } else {
      filterObj.guests = savedAdverts;
    }
  });
};

const listenFeatures = function (domElement, feature) {
  domElement.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      filterObj[feature] = savedAdverts.filter(e => e.offer.features.includes(evt.target.value));
    } else {
      filterObj[feature] = savedAdverts;
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
  getFilteredFeatures(savedAdverts.forEach(ad => getFilteredFeatures(ad)));
  obj.features = advertsFeatures;
};

filterObj.type = savedAdverts;
filterObj.price = savedAdverts;
filterObj.rooms = savedAdverts;
filterObj.guests = savedAdverts;
filterObj.features = savedAdverts;
filterObj.wifi = savedAdverts;
filterObj.dishwasher = savedAdverts;
filterObj.parking = savedAdverts;
filterObj.washer = savedAdverts;
filterObj.elevator = savedAdverts;
filterObj.conditioner = savedAdverts;
filterhousingType();
filterhousingPrice();
filterhousingRooms();
filterhousingGuests();
listenFeatures(featuresWifi, 'wifi');
listenFeatures(featuresDishwasher, 'dishwasher');
listenFeatures(featuresParking, 'parking');
listenFeatures(featuresWasher, 'washer');
listenFeatures(featuresElevator, 'elevator');
listenFeatures(featuresConditioner, 'conditioner');

const renderFilteredAdverts = function (adverts) {
  mapFilters.addEventListener('change', (evt) => {
    switch (evt.target) {
      case housingTypeElement:
        filterhousingType();
        break;
      case housingPriceElement:
        filterhousingPrice();
        break;
      case housingRoomsElement:
        filterhousingRooms();
        break;
      case housingGuestsElement:
        filterhousingGuests();
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
    const debounceAds = _.debounce(() => compare(filterObj, adverts), RERENDER_DELAY);
    return debounceAds()
  });
};

export {mapFilters, renderFilteredAdverts, setFilterAdverts}
