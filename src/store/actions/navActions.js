import { ActionTypes } from './ActionsTypes';
import { buildLoggers } from '../../utils/log';

const { error } = buildLoggers('navigationActions');

// eslint-disable-next-line no-unused-vars
export const updateNavConfig = (config) => async (dispatch, getState) => {
  // log('updateNavConfig', { config });
  dispatch({
    type: ActionTypes.UPDATE_NAV_CONFIG,
    payload: { config },
  });
};

// eslint-disable-next-line no-unused-vars
export const loadNavConfig = () => async (dispatch, getState) => {
  // log('loadNavConfig()');
  try {
    dispatch({ type: ActionTypes.LOAD_NAV_CONFIG });
    // todo('loadNavConfig()', 'end point would be useful for user data');
    // todo: // const response = await fetch('sdlkjskld/app/spom');

    // warn('loadNavConfig()', 'global vars on window not preferred');
    dispatch(updateNavConfig(window.testNavFromWindow));
  } catch (err) {
    error('loadNavConfig()', err);
  }
};
