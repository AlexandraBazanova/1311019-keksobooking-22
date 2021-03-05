import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {renderAdverts, filterType} from './map.js'
import {setUserFormSubmit, clearForm} from './form.js'

getData((adverts) => {
 //renderAdverts(adverts);
 filterType(adverts);
});

setUserFormSubmit(clearForm);
