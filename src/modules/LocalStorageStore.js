import { buildLoggers } from '../utils/log';

const { error } = buildLoggers('LocalStorage');

const buildLocalStorageItem = ({ id }) => Object.freeze({
  get: () => {
    let localStorageState;
    try {
      localStorageState = localStorage.getItem(id);
      localStorageState = JSON.parse(localStorageState);
    } catch (err) {
      error('localStorage not available');
    }
    return localStorageState;
  },
  set: (store) => {
    try {
      const store_as_string = JSON.stringify(store);
      localStorage.setItem(id, store_as_string);
    } catch (err) {
      error('localStorage not available');
    }
  },
});

export default buildLocalStorageItem;
