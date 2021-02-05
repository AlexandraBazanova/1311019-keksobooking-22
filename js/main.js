'use strict';

// Функция, возвращающая случайное целое положительное число из переданного диапазона включительно
const getRandomNumber = function (min, max) {
  // Округляет min до ближайшего большего целого
  min = Math.ceil(min);
  // Округляет max до ближайшего меньшего целого
  max = Math.floor(max);
  // Ставим условие, что min положительное число, включая ноль, а также, что min всегда  либо больше, либо равен max.
  if (min >= 0 && min <= max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  console.log('Ошибка: Выбранный диапазон не соответсвует условиям')
return -1;
};
// Источник: https://developer.mozilla.org/


  // Функция, возвращающая случайное положительное число с заданным количеством цифр после запятой из переданного диапазона включительно
const getRandomArbitrary = function (min, max, digits) {
  // Ставим условие, что min положительное число, включая ноль, а также, что min всегда  либо больше, либо равен max.
  if (min >= 0 && min <= max) {
  // К формуле поиска случайного числа подключаем встроенный метод toFixed, который оставляет у полученного случайного числа заданное количество цифр после запятой
    return (Math.random() * (max - min) + min).toFixed(digits);
  }
    // Выводим в консоль сообщение об ошибке, если заданный диапазон чисел не соответсвует требованиям
    console.log('Ошибка: Выбранный диапазон не соответсвует условиям')
return -1;
};
// Источник: https://developer.mozilla.org/

//****************************************************************************
const SIMILAR_ADVERT_COUNT = 10;
const TITLES = ['Best offer', 'Great location', 'Choice of visitors', 'Top 100', 'Eco-friendly', 'Summer offer', 'For family holidays', 'Best city view'];
const TYPES_OF_APPARTMENTS = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS_COUNTS = [1, 2, 3, 100];
const GUESTS_COUNTS = [1, 2, 3, 4];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPARTMENTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const DESCRIPTIONS = ['Do not miss the best deal!', 'All sights of the city within walking distance', 'Helpful staff, comfortable location, parking on request', 'Services of a guide-translator, nanny, organization of weddings and celebrations. To get the service, contact the reception', 'Thank you Google translate'];

const getOneRandomItem = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const getRandomItemsArray = (arr, count) => {
  let _arr = [...arr];
  return [...new Set([...Array(count)].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]))];
};

const createAdvert = () => {
  const getPoint = {
    x: getRandomArbitrary(35.65000, 35.70000, 5),
    y:getRandomArbitrary(139.70000, 139.80000, 5)
  };
  const adTime = getOneRandomItem(TIMES);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`
    },
    offer: {
      title: getOneRandomItem(TITLES),
      address: `location.${getPoint.x}, location.${getPoint.y}`,
      price: getRandomNumber(0, 1000000),
      type: getOneRandomItem(TYPES_OF_APPARTMENTS),
      rooms: getOneRandomItem(ROOMS_COUNTS),
      guests: getOneRandomItem(GUESTS_COUNTS),
      checkin: adTime,
      checkout: adTime,
      features: getRandomItemsArray(FEATURES, getRandomNumber(0, FEATURES.length - 1)),
      description: getOneRandomItem(DESCRIPTIONS),
      photos: getRandomItemsArray(APPARTMENTS_PHOTOS, getRandomNumber(0, APPARTMENTS_PHOTOS.length - 1)),
    },
    location: {
      x: getPoint.x,
      y: getPoint.y
    }
  };
};

const similarAdvert = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
console.log(similarAdvert)
