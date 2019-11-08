/* eslint-disable no-unused-vars,import/prefer-default-export */
import { ActionTypes } from './ActionsTypes';
import { buildLoggers } from '../../utils/log';

const { log, todo, warn, error } = buildLoggers('userActions');

export const getUserIP = () => async (dispatch, getState) => {
  log('getUserIP()');

  try {
    const url = 'https://api.ipify.org?format=json';
    const payload = await fetch(url, { method: 'GET' }).then((response) => response.json());

    log('getUserIP()', { payload });

    return dispatch({
      type: ActionTypes.USER_GET_IP,
      payload,
    });
  } catch (err) {
    error('getUserIP()', err);

    return dispatch({
      type: ActionTypes.USER_ERROR,
      payload: { ...err, message: 'get user ip failed' },
    });
  }
};

export const updateUserConfig = (config) => async (dispatch, getState) => {
  log('updateUserConfig', { config });
  dispatch({
    type: ActionTypes.UPDATE_USER_CONFIG,
    payload: { config },
  });
};

export const loadUserConfig = () => async (dispatch, getState) => {
  // log('loadUserConfig()');
  try {
    dispatch({ type: ActionTypes.LOAD_USER_CONFIG });

    // todo('loadUserConfig()', 'end point would be useful for user data');
    // todo: await api.get.user-config

    // warn('loadUserConfig()', 'global vars on window not preferred');
    dispatch(updateUserConfig(window.CPUserData.Data));
  } catch (err) {
    error('loadUserConfig()', err);
  }
};
