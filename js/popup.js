import {similarAdvert} from './data.js';
export {renderCard};


const renderCard = function (announcement) {
  //Находим фрагмент с содержимым темплейта
  const templateFragment = document.querySelector('#card').content;
  //Клонируем фрагмент со всеми внутренностями
  const cardElement = templateFragment.cloneNode(true);
  //В фрагменте находим нужные элементы
  const adsElement = cardElement.querySelector('.popup');

  adsElement.querySelector('.popup__title').textContent = announcement.offer.title;
  adsElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  adsElement.querySelector('.popup__text--price').textContent = `${announcement.offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = announcement.offer.type;
  adsElement.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;

  const getFeatures = function () {
    //Создаем контейнер для features
    const featuresFragment = document.createDocumentFragment();
    for (let i = 0; i < announcement.offer.features.length; i++) {
      //Создаем список с актуальными для объявления элементами
      const newElement = document.createElement('li');
      //Показываем, как должен называться класс у каждого элемента
      const newClassFeature = 'popup__feature--' + announcement.offer.features[i];
      //Добавляем этот класс
      newElement.classList.add('popup__feature', newClassFeature);
      //Складываем элементы в контейнер
      featuresFragment.appendChild(newElement);
    }
    return featuresFragment;
  };
  const featuresList = adsElement.querySelector('.popup__features');
  //Очищаем от стандартного (полного) набора features
  featuresList.innerHTML = '';
  //Складываем в коробочку с классом "popup__features" только элементы из getFeatures
  featuresList.appendChild(getFeatures(announcement.offer.features));

  adsElement.querySelector('.popup__description').textContent = announcement.offer.description;

  const getImage = function (arr) {
    //Ищем элементы с классом popup__photo
    const image = adsElement.querySelector('.popup__photo');
      if (arr.length == 1) {
        image.setAttribute("src", arr[0]);
      }
        if (arr.length > 1) {
          for (let i = 1; i < arr.length ; i++) {
            image.setAttribute("src", arr[0]);
            const imageClone = image.cloneNode();
            adsElement.appendChild(imageClone);
            imageClone.setAttribute("src", arr[i]);
          }
        }
          else if (arr.length == 0) {
            image.classList.add('hidden');
          }
  };
  getImage(announcement.offer.photos);

  const cardAvatar = adsElement.querySelector('.popup__avatar');
  cardAvatar.setAttribute("src", announcement.author.avatar);

  return cardElement;
};
//Создаем коробочку для объявлений
const fragment = document.createDocumentFragment();
//Складываем в коробочку только первое объявление
//fragment.appendChild(renderCard(similarAdvert[0]));

//Отрисовываем первое объявление
// const advert = document.querySelector('.map__canvas');
// advert.appendChild(fragment);

