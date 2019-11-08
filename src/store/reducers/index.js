import { combineReducers } from 'redux';
import User from './userReducer';
import Router from './routerReducer';
import Container from './containerReducer';
import Nav from './navReducer';
import Form from './formReducer';

const rootReducer = combineReducers({
  User,
  Router,
  Container,
  Nav,
  Form,
});

export default rootReducer;
