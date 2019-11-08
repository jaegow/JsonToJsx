import { ActionTypes } from '../actions/ActionsTypes';
import { buildLoggers } from '../../utils/log';

const { todo, log } = buildLoggers('searchCriteriaReducer');

const initialState = {
  config: {
    Country: 'USA',
    ZipPostalCode: '48083',
    MatchingSet: [{ MatchingSetId: 1, MatchingSetDesc: 'All 816s' }],
    AANShipto: '1003207',
    HQAANShipto: '1003208',
    BillTo: '1003206',
    DealerName: 'Bauer',
    ContractStatus: ['active'],
    DealerRecordStatus: ['active', 'hold'],
    CustAccNumber: '1003206',
    DistBTName: 'Bauer',
    CustAddress816: 'SC',
    CustName816: 'Bauer',
    Import816Dates: [{ ImportDateId: 1, Import816Date: new Date(2019, 10, 5) }],
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  // if (type === ActionTypes.LOAD_SEARCH_CRITERIA_CONFIG) {
  //   // todo('ActionTypes.LOAD_NAV_CONFIG', 'is this necessary??');
  // }

  if (type === ActionTypes.UPDATE_SEARCH_CRITERIA_CONFIG) {
    log('ActionTypes.UPDATE_SEARCH_CRITERIA_CONFIG', { payload });
    const { config } = payload;
    return {
      ...state,
      config,
    };
  }

  return state;
};
