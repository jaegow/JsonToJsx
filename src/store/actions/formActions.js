import { ActionTypes } from './ActionsTypes';
import { buildLoggers } from '../../utils/log';

const { error } = buildLoggers('formActions');

const mock_data = {

};

// eslint-disable-next-line no-unused-vars
export const updateFormConfig = (config) => async (dispatch, getState) => {
  // log('updateFormConfig', { config });
  dispatch({
    type: ActionTypes.UPDATE_FORM_CONFIG,
    payload: { config },
  });
};

// eslint-disable-next-line no-unused-vars
export const loadFormConfig = () => async (dispatch, getState) => {
  // log('loadFormConfig()');
  try {
    dispatch({ type: ActionTypes.LOAD_FORM_CONFIG });
    // todo: // const response = await fetch('sdlkjskld/app/spom');
    dispatch(updateFormConfig(window.testNavFromWindow));
  } catch (err) {
    error('loadNavConfig()', err);
  }
};
