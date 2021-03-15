import {
  renderAdverts
} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingTypeElement = mapFilters.querySelector('#housing-type');
const housingPriceElement = mapFilters.querySelector('#housing-price');
const housingRoomsElement = mapFilters.querySelector('#housing-rooms');
const housingGuestsElement = mapFilters.querySelector('#housing-guests');
const housingFeaturesElements = mapFilters.querySelectorAll('[name="features"]');

// const filterType = function (arr) {
//   housingTypeElement.addEventListener('change', (evt) => {
//     if (evt.target.value !== 'any') {
//       renderAdverts(arr.filter(e => e.offer.type == evt.target.value))
//     } else {
//       renderAdverts(arr)
//     }
//   });
// };

// const filterPrice = function (arr) {
//   housingPriceElement.addEventListener('change', (evt) => {
//     if (evt.target.value == 'middle') {
//       renderAdverts(arr.filter(e => e.offer.price >= 10000 && e.offer.price <= 50000))
//     } else if (evt.target.value == 'low') {
//       renderAdverts(arr.filter(e => e.offer.price < 10000))
//     } else if (evt.target.value == 'high') {
//       renderAdverts(arr.filter(e => e.offer.price > 50000))
//     } else {
//       renderAdverts(arr)
//     }
//   });
// };

// const filter1 = function (arr) {
//   housingRoomsElement.addEventListener('change', (evt) => {
//     if (evt.target.value !== 'any') {
//       renderAdverts(arr.filter(e => e.offer.rooms == evt.target.value))
//     } else {
//       renderAdverts(arr)
//     }
//   });

//   housingGuestsElement.addEventListener('change', (evt) => {
//     if (evt.target.value !== 'any') {
//       renderAdverts(arr.filter(e => e.offer.guests == evt.target.value))
//     } else {
//       renderAdverts(arr)
//     }
//   });

//   housingFeaturesElements.forEach((element) => {
//     element.addEventListener('change', (evt) => {
//       if (evt.target.checked) {
//         renderAdverts(arr.filter(e => e.offer.features.includes(evt.target.value)))
//       } else {
//         renderAdverts(arr)
//       }
//     });
//   });
// };

const filterObj = {};

//Object.keys(obj).map(criterion => arr.filter(e => obj[criterion] == e.offer[criterion]))


const compare = function (arr, obj) {

  // console.log(obj)
  // const keys = obj => Object.keys(obj).map(k => obj[k])
  // const filteredArray = obj => keys(obj)[0].filter(value => keys(obj)[1].includes(value))
  // console.log(filteredArray(obj))
  const getIntersection = function(...a) {
    return [this,...a].reduce((p,c) => p.filter(e => c.includes(e)));
  }

  const arrTotal = [...obj.type, ...obj.price, ...obj.rooms, ...obj.guests, ...obj.features];
console.log(arrTotal)

console.log(  getIntersection(arrTotal));

}


const generalFilter = function (arr) {

  housingTypeElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.type = arr.filter(e => e.offer.type == evt.target.value);
      compare(arr, filterObj)
      //  console.log(filterObj.type)
    } else {
      filterObj.type = arr;
    }
  });

  housingPriceElement.addEventListener('change', (evt) => {
    if (evt.target.value == 'middle') {
      filterObj.price = arr.filter(e => e.offer.price >= 10000 && e.offer.price <= 50000);
      compare(arr, filterObj);
    } else if (evt.target.value == 'low') {
      filterObj.price = arr.filter(e => e.offer.price < 10000);
      compare(arr, filterObj);
    } else if (evt.target.value == 'high') {
      filterObj.price = arr.filter(e => e.offer.price > 50000);
      compare(arr, filterObj);
    } else {
      filterObj.price = arr;
    }
  })

  housingRoomsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.rooms = arr.filter(e => e.offer.rooms == evt.target.value);
      compare(arr, filterObj);
    } else {
      filterObj.rooms = arr;
    }
  });

  housingGuestsElement.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      filterObj.guests = arr.filter(e => e.offer.guests == evt.target.value);
      compare(arr, filterObj);
    } else {
      filterObj.guests = arr;
    }
  });

  housingFeaturesElements.forEach((element) => {
    element.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        filterObj.features = arr.filter(e => e.offer.features.includes(evt.target.value));
        compare(arr, filterObj);
      } else {
        filterObj.features = arr
      }
    });
  });

};




export {generalFilter}



// const a = [1, 2, 3, 4 , 5];
// const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
// const aa = [[0, 1], [2, 3], [4, 5]];
// const o = [ {x: 1}, {x: 2}, {x: 3}];
// const friends = [
//   { name: "Anna", books: ["Bible", "Harry Potter"], age: 21 },
//   { name: "Bob", books: ["War and peace", "Romeo and Juliet"], age: 26 },
//   { name: "Alice", books: ["The Lord of the Rings", "The Shining"], age: 27 }
//   ];

//   const reducer = (accumulator, currentValue) => accumulator + currentValue;
//   console.log(a.reduce(reducer)); //15
//   console.log(a.reduce(reducer, 5)); //20
//   const total = a.reduce(function(c, b) {
//     return c + b;
//   });
//    console.log(total);//15

//    const initialValue = 0;
//    const sum = o.reduce(function (accumulator, currentValue) {
//        return accumulator + currentValue.x;
//    }, initialValue)
//    console.log(sum); //6

//    const flattened = aa.reduce(function(a, b) {
//     return a.concat(b);
//   });
//   console.log(flattened); //[0, 1, 2, 3, 4, 5]

//   const allbooks = friends.reduce(function(prev, curr) {
//     console.log(...prev);

//     return [...prev, ...curr.books];
//   }, ["Alphabet"]);
//   console.log(allbooks); //["Alphabet", "Bible", "Harry Potter", "War and peace", "Romeo and Juliet", "The Lord of the Rings", "The Shining"]

// // filter ----------------------------------------------------------------------------------------

//   const result = words.filter(word => word.length > 6);
// console.log(result); //["exuberant", "destruction", "present"]

//  // map -------------------------------------------

//  const roots = a.map(Math.sqrt);
//  console.log(roots) // [1, 1.4142135623730951, 1.7320508075688772, 2, 2.23606797749979]

//  const rootsF = a.filter(e => Math.sqrt(e) == e);
//  console.log(rootsF)// [1]

//  const rootsR = a.reduce(e => Math.sqrt(e) == e);
//  console.log(rootsR)// true

//  const rooR = a.reduce(Math.sqrt);
//  console.log(rooR)// 1

//  const roo = friends.reduce(function(prev, curr) { return [...prev, curr.age]},[5]);
//  console.log(roo)//
