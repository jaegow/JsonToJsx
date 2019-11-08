/* eslint-disable import/prefer-default-export */
import queryStringParser from 'query-string';
import { ActionTypes } from '../actions/ActionsTypes';
import { splitUrlFromQueryParams } from '../../utils/url';
// import { buildLoggers } from '../../utils/log';
// const { log } = buildLoggers('routerReducer');

const initialState = { location: undefined,
  match: undefined,
  queryParams: undefined,
  // todo: find better solution than having history methods here
  history: undefined };

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === ActionTypes.SAVE_ROUTER_DATA) {
    let { location } = payload;
    const { match, history } = payload;
    const { search } = location;

    // react router not picking up query params
    // query params end up on location.pathname instead of location.search
    if (!search || !search.length) {
      const parsedLocation = splitUrlFromQueryParams(location.pathname);
      location = { ...location,
        search: parsedLocation.search,
        pathname: parsedLocation.pathname };
    }

    const queryParams = queryStringParser.parse(location.search);

    return { ...state,
      history,
      location,
      match,
      queryParams };
  }
  return state;
};
