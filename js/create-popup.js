const TYPES_OF_APPARTMENTS = {
  flat: {ru: 'Квартира', price: 1000},
  palace: {ru: 'Дворец', price: 10000},
  house : {ru: 'Дом', price: 5000},
  bungalow : {ru: 'Бунгало', price: 0}
};

const createCustomPopup = function (point) {
  const advTemplate = document.querySelector('#card').content;
  const advCard = advTemplate.cloneNode(true);
  const advElement = advCard.querySelector('.popup');

  advElement.querySelector('.popup__title').textContent = point.offer.title;
  advElement.querySelector('.popup__text--address').textContent = point.offer.address;
  advElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;

  const getTypeRu = function(getObj) {
    return getObj.offer.type === Object.keys(TYPES_OF_APPARTMENTS)[0] ? TYPES_OF_APPARTMENTS.flat.ru:
      (getObj.offer.type === Object.keys(TYPES_OF_APPARTMENTS)[1] ? TYPES_OF_APPARTMENTS.palace.ru:
      (getObj.offer.type === Object.keys(TYPES_OF_APPARTMENTS)[2] ? TYPES_OF_APPARTMENTS.house.ru:
      TYPES_OF_APPARTMENTS.bungalow.ru
      ))};
  advElement.querySelector('.popup__type').textContent = getTypeRu(point);

  advElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  advElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;

  const getFeatures = function () {
    const featuresFragment = document.createDocumentFragment();
    const createDomFeature = function(feature){
      const newElement = document.createElement('li');
      const newClassFeature = 'popup__feature--' + feature;
      newElement.classList.add('popup__feature', newClassFeature);
      featuresFragment.appendChild(newElement);
    }
    point.offer.features.forEach(e => createDomFeature(e));
    return featuresFragment;
  };
  const featuresList = advElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  featuresList.appendChild(getFeatures(point.offer.features));

  advElement.querySelector('.popup__description').textContent = point.offer.description;

  const getImage = function (arr) {
    const image = advElement.querySelector('.popup__photo');
    if (arr.length === 1) {
      image.setAttribute("src", arr[0]);
    }
    if (arr.length > 1) {
      for (let i = 1; i < arr.length; i++) {
        image.setAttribute("src", arr[0]);
        const imageClone = image.cloneNode();
        advElement.appendChild(imageClone);
        imageClone.setAttribute("src", arr[i]);
      }
    } else if (arr.length === 0) {
      image.classList.add('hidden');
    }
  };
  getImage(point.offer.photos);

  advElement.querySelector('.popup__avatar').setAttribute('src', point.author.avatar);

  return advElement;
};

export {TYPES_OF_APPARTMENTS, createCustomPopup};
