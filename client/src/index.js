import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reducers from './reducers/context.reducer';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import View from './containers/board.containers';

let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App>
      <View/>
    </App>
  </Provider>,
  document.getElementById('root')
);
