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
  } else {
    return console.log('Ошибка: Выбранный диапазон не соответсвует условиям')
  }
};
// Источник: https://developer.mozilla.org/
  console.log('getRandomNumber ' + getRandomNumber(0 , 2.26))

  // Функция, возвращающая случайное положительное число с плавающей запятой из переданного диапазона включительно
const getRandomArbitrary = function (min, max, digits) {
  // Ставим условие, что min положительное число, включая ноль, а также, что min всегда  либо больше, либо равен max.
  if (min >= 0 && min <= max) {
  // К формуле поиска случайного числа подключаем встроенный метод toFixed, который оставляет у полученного случайного числа заданное количество цифр после запятой
    return (Math.random() * (max - min) + min).toFixed(digits);
  } else {
    // Выводим в консоль сообщение об ошибке, если заданный диапазон чисел не соответсвует требованиям
    return console.log('Ошибка: Выбранный диапазон не соответсвует условиям')
  }
};
// Источник: https://developer.mozilla.org/
console.log('getRandomArbitraryr ' + getRandomArbitrary(1.01 , 1, 2))

