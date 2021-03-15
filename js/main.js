import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {renderAdverts} from './map.js'
import {setUserFormSubmit, clearForm} from './form.js'
import {generalFilter} from './filter.js'

getData((adverts) => {
 renderAdverts(adverts);
 generalFilter(adverts);
});

setUserFormSubmit(clearForm);
