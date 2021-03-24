const IMAGE_WIDTH = 45;
const IMAGE_HEIGHT = 40;
const TYPES_OF_APPARTMENTS = {
  flat: {ru: 'Квартира', price: 1000},
  palace: {ru: 'Дворец', price: 10000},
  house : {ru: 'Дом', price: 5000},
  bungalow : {ru: 'Бунгало', price: 0},
};

const getFeatures = function(featuresList, features){
  featuresList.innerHTML = '';
  if (features.length) {
    features.forEach((feature) => {
      const newElement = document.createElement('li');
      const newClassFeature = 'popup__feature--' + feature;
      newElement.classList.add('popup__feature', newClassFeature);
      featuresList.appendChild(newElement);
    });
  } else {
    featuresList.remove();
  }
};

const getImages = function(imagesList, images) {
  imagesList.innerHTML = '';
  if (images.length) {
    images.forEach((image) => {
      const newElement = document.createElement('img');
      newElement.src = image;
      newElement.classList.add('popup__photo');
      newElement.style.width = `${IMAGE_WIDTH}px`;
      newElement.style.height = `${IMAGE_HEIGHT}px`;
      imagesList.appendChild(newElement);
    });
  } else {
    imagesList.remove();
  }
};

const createCustomPopup = function (point) {
  const advTemplate = document.querySelector('#card').content;
  const advCard = advTemplate.cloneNode(true);
  const advElement = advCard.querySelector('.popup');
  const featuresList = advElement.querySelector('.popup__features');
  const imagesList = advElement.querySelector('.popup__photos');

  advElement.querySelector('.popup__title').textContent = point.offer.title;
  advElement.querySelector('.popup__text--address').textContent = point.offer.address;
  advElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  advElement.querySelector('.popup__type').textContent = TYPES_OF_APPARTMENTS[point.offer.type].ru;
  advElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  advElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  getFeatures(featuresList, point.offer.features);
  advElement.querySelector('.popup__description').textContent = point.offer.description;
  getImages(imagesList, point.offer.photos);
  advElement.querySelector('.popup__avatar').setAttribute('src', point.author.avatar);

  return advElement;
};

export {TYPES_OF_APPARTMENTS, createCustomPopup};
