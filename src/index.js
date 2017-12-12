import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './assets/index.css';
import App from './components/App.jsx';
import { createStore } from 'redux'; 
import { Provider } from 'react-redux';
import reducer from './reducers';

import registerServiceWorker from './lib/registerServiceWorker';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
   document.getElementById('root'));
registerServiceWorker();
