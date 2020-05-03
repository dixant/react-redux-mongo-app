import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducers from '../src/store/reducers/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk';

const store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
      <App />
</Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
