import './form.js';
import './map.js';
import {getData, advertisments} from './api.js';
import {renderAdverts} from './map.js';
import {setUserFormSubmit, submitAd} from './form.js';
import {renderFilteredAdverts} from './filter.js';
import {showErrorAlert} from './utils.js';

const getAdverts = () => {
  renderAdverts(advertisments);
  renderFilteredAdverts(advertisments);
};

getData(getAdverts,
  () => showErrorAlert('Не удалось получить данные. Попробуйте обновить страницу'),
);

setUserFormSubmit(submitAd);


