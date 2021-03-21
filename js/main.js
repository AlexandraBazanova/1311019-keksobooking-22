import './form.js';
import './map.js';
import {getData} from './api.js';
import {renderAdverts} from './map.js';
import {setUserFormSubmit, successSubmit, setAdvert} from './form.js';
import {getFilteredAdverts} from './filter.js';

getData((ads)=> {
 renderAdverts(ads);
 getFilteredAdverts(ads);
 setAdvert(ads);
});

setUserFormSubmit(successSubmit);

