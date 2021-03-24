import './form.js';
import './map.js';
import {getData} from './api.js';
import {renderAdverts} from './map.js';
import {setUserFormSubmit, successSubmit, setFormAdverts} from './form.js';
import {renderFilteredAdverts, setFilterAdverts} from './filter.js';
import {showErrorAlert} from './utils.js';

const getAdverts = (adverts) => {
  renderAdverts(adverts);
  renderFilteredAdverts(adverts);
  setFilterAdverts(adverts);
  setFormAdverts(adverts);
};

getData(getAdverts,
  () => showErrorAlert('Не удалось получить данные. Попробуйте обновить страницу'),
);

setUserFormSubmit(successSubmit);


