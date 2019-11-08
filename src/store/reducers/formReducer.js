import { ActionTypes } from '../actions/ActionsTypes';
import { buildLoggers } from '../../utils/log';

const { todo, log } = buildLoggers('searchCriteriaReducer');

const initialState = {
  config: {

  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === ActionTypes.UPDATE_FORM_CONFIG) {
    log('ActionTypes.UPDATE_FORM_CONFIG', { payload });
    const { config } = payload;
    return {
      ...state,
      config,
    };
  }

  return state;
};
