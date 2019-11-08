import { combineReducers } from 'redux';
import User from './userReducer';
import Router from './routerReducer';
import Container from './containerReducer';
import Nav from './navReducer';
import SearchCriteria from './searchCriteriaReducer';

const rootReducer = combineReducers({
  User,
  Router,
  Container,
  Nav,
  SearchCriteria,
});

export default rootReducer;
