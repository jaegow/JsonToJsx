import { ActionTypes } from '../actions/ActionsTypes';
// import { buildLoggers } from '../../utils/log';
// const { todo, log } = buildLoggers('navReducer');

const initialState = {
  config: undefined,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  // if (type === ActionTypes.LOAD_NAV_CONFIG) {
  //   todo('ActionTypes.LOAD_NAV_CONFIG', 'is this necessary??');
  // }

  if (type === ActionTypes.UPDATE_NAV_CONFIG) {
    const { config } = payload;
    return {
      ...state,
      config,
    };
  }

  return state;
};
