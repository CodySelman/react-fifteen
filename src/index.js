import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './fadeIn.css';
import './fadeOut.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();