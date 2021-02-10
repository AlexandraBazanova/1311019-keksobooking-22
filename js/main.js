import {createAdvert} from './data.js';

const SIMILAR_ADVERT_COUNT = 10;
const similarAdvert = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
console.log(similarAdvert)
