/* eslint-disable import/prefer-default-export */
import { ActionTypes } from './ActionsTypes';
import { buildLoggers } from '../../utils/log';

const { log } = buildLoggers('containerActions');

export const updateContainerSize = ({ width, height }) => (
  dispatch,
  getState,
) => {
  log('updateContainerSize', { width, height });

  return dispatch({
    type: ActionTypes.UPDATE_CONTAINER_SIZE,
    width,
    height,
  });
};
