import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App.jsx';
import registerServiceWorker from './lib/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();