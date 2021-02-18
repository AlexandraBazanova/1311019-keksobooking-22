export {getRandomNumber, getRandomArbitrary, getOneRandomItem, getRandomItemsArray};

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

// Функция, возвращающая случайный элемент массива
const getOneRandomItem = (arr) => arr[getRandomNumber(0, arr.length - 1)];

// Функция, возвращающая новый массив из случайных неповторяющихся элементов исходного массива
const getRandomItemsArray = (arr, count) => {
  let _arr = [...arr];
  return [...new Set([...Array(count)].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]))];
};