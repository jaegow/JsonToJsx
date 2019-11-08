import { ActionTypes } from '../actions/ActionsTypes';
// import { buildLoggers } from '../../utils/log';
// const { todo, log } = buildLoggers('containerReducer');

const initialState = {
  width: undefined,
  height: undefined,
};

export default (state = initialState, action) => {
  const { type } = action;

  if (type === ActionTypes.UPDATE_CONTAINER_SIZE) {
    // log('ActionTypes.UPDATE_CONTAINER_SIZE');

    // update if defined otherwise use last
    const width = action.width || state.width;
    const height = action.height || state.height;
    return { ...state,
      width,
      height };
  }

  return state;
};
