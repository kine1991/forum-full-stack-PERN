import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

ReactDOM.render(
  <div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);

