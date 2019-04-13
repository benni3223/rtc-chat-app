import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom'
import configureStore from './store';

import './index.css';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import * as serviceWorker from './serviceWorker';

import { Router, Route, Link, browserHistory } from 'react-router-3'
import RTCProvider from './provider/RTCProvider';


render(
<Provider store={configureStore()}>
    <RTCProvider url="localhost:8080">
        <Router history={browserHistory}>
            <Route path="/" component={ChatPage}/>
            <Route path="login" component={LoginPage}/>
        </Router>
  </RTCProvider>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
