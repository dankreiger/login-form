import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineForms } from 'react-redux-form';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';



// initial redux state
const initialUserState = {
  vorname: '',
  nachname: '',
  mitgliedsname: '',
  email: '',
  passwort: ''
};

const store = createStore(combineForms({
  user: initialUserState,
}), applyMiddleware(thunk));



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
