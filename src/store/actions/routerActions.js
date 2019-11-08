/* eslint-disable no-unused-vars,import/prefer-default-export */
import { ActionTypes } from './ActionsTypes';
import { buildLoggers } from '../../utils/log'

const { log } = buildLoggers('routerActions');

export const saveRouterData = (data) => (dispatch, getState) => {
  // log('saveRouterData()');
  return dispatch({
    type: ActionTypes.SAVE_ROUTER_DATA,
    payload: data,
  });
};
