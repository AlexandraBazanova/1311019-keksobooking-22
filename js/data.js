import {getRandomNumber, getRandomArbitrary, getOneRandomItem, getRandomItemsArray} from './utils.js';

const TITLES = ['Best offer', 'Great location', 'Choice of visitors', 'Top 100', 'Eco-friendly', 'Summer offer', 'For family holidays', 'Best city view'];
const TYPES_OF_APPARTMENTS = [{
  en: 'flat',
  ru: 'Квартира'
},
{
  en: 'palace',
  ru: 'Дворец'
},
{
  en: 'house',
  ru: 'Дом'
},
{
  en: 'bungalow',
  ru: 'Бунгало'
}
];
const ROOMS_COUNTS = [1, 2, 3, 100];
const GUESTS_COUNTS = [1, 2, 3, 4];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPARTMENTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const DESCRIPTIONS = ['Do not miss the best deal!', 'All sights of the city within walking distance', 'Helpful staff, comfortable location, parking on request', 'Services of a guide-translator, nanny, organization of weddings and celebrations. To get the service, contact the reception', 'Thank you Google translate'];
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
export {similarAdvert};
