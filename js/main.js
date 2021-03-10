import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {renderAdverts, filterType,filterPrice, filterRooms, filterGuests, filterFeatures} from './map.js'
import {setUserFormSubmit, clearForm} from './form.js'

getData((adverts) => {
  console.log(adverts);

 renderAdverts(adverts);
 filterType(adverts);
 filterPrice(adverts);
 filterRooms(adverts);
 filterGuests(adverts);
 filterFeatures(adverts);
});

setUserFormSubmit(clearForm);
