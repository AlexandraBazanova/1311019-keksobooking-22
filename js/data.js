import {getRandomNumber, getRandomArbitrary, getOneRandomItem, getRandomItemsArray} from './utils.js';

const TITLES = ['Лучшее предложение', 'Великолепное расположение', 'Выбор посетителей', 'Top 100', 'Eco-friendly', 'Летнее предложение', 'Для семейных выходных', 'Лучший вид на город'];
const TYPES_OF_APPARTMENTS = [{
  en: 'flat',
  ru: 'Квартира',
  minPrice: 1000
},
{
  en: 'palace',
  ru: 'Дворец',
  minPrice: 10000
},
{
  en: 'house',
  ru: 'Дом',
  minPrice: 5000
},
{
  en: 'bungalow',
  ru: 'Бунгало',
  minPrice: 0
}
];
const ROOMS_COUNTS = [1, 2, 3, 100];
const GUESTS_COUNTS = [1, 2, 3, 4];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPARTMENTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const DESCRIPTIONS = ['Не упустите лучшее предложение в регионе', 'Все достопримечательности в пешей доступности', 'Внимательный персонал, удобное расположение, парковка по запросу', 'Услуги няни, переводчика, проведение мероприятий. Для получения услуги обратитесь на ресепшн', 'Thank you Google translate'];
const SIMILAR_ADVERT_COUNT = 10;

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
      type: getOneRandomItem(TYPES_OF_APPARTMENTS).ru,
      rooms: getOneRandomItem(ROOMS_COUNTS),
      guests: getOneRandomItem(GUESTS_COUNTS),
      checkin: adTime,
      checkout: adTime,
      features: getRandomItemsArray(FEATURES, getRandomNumber(0, FEATURES.length - 1)),
      description: getOneRandomItem(DESCRIPTIONS),
      photos: getRandomItemsArray(APPARTMENTS_PHOTOS, getRandomNumber(0, APPARTMENTS_PHOTOS.length)),
    },
    location: {
      x: getPoint.x,
      y: getPoint.y
    }
  };
};

const similarAdvert = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
console.log(similarAdvert)
export {similarAdvert, TYPES_OF_APPARTMENTS, TIMES};
