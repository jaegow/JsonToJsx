import { ActionTypes } from '../actions/ActionsTypes';

// import { buildLoggers } from '../../utils/log';
// const { log } = buildLoggers('userReducer');

const initialState = {
  ip: null,
  config: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === ActionTypes.USER_GET_IP) {
    const { ip } = payload;
    return {
      ...state,
      ip,
    };
  }

  // if (type === ActionTypes.LOAD_USER_CONFIG) {
  //   todo('ActionTypes.LOAD_USER_CONFIG', 'is this necessary??');
  // }

  if (type === ActionTypes.UPDATE_USER_CONFIG) {
    // log('ActionTypes.UPDATE_USER_CONFIG', { payload });
    return {
      ...state,
      // config: {
      //   ...payload.config.data,
      // },
    };
  }

  // if (type === ActionTypes.USER_ERROR) {
  //   todo({ type, payload });
  // }

  return state;
};
