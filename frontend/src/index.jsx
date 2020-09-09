import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'redux/store';
import { Background } from './index.styles';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import ToastProvider from 'context/toast/toast.provider';

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <BrowserRouter>
      <Background>
        <App />
      </Background>
      </BrowserRouter>
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

