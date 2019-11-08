import { ActionTypes } from './ActionsTypes';
import { buildLoggers } from '../../utils/log';

const { error } = buildLoggers('searchCriteriaActions');

const mock_data = {

};

// eslint-disable-next-line no-unused-vars
export const updateSearchCriteriaConfig = (config) => async (dispatch, getState) => {
  // log('updateNavConfig', { config });
  dispatch({
    type: ActionTypes.UPDATE_SEARCH_CRITERIA_CONFIG,
    payload: { config },
  });
};

// eslint-disable-next-line no-unused-vars
export const loadSearchCriteriaConfig = () => async (dispatch, getState) => {
  // log('loadNavConfig()');
  try {
    dispatch({ type: ActionTypes.LOAD_SEARCH_CRITERIA_CONFIG });
    // todo: // const response = await fetch('sdlkjskld/app/spom');

    // warn('loadNavConfig()', 'global vars on window not preferred');
    dispatch(updateSearchCriteriaConfig(window.CPMenuData));
  } catch (err) {
    error('loadNavConfig()', err);
  }
};
