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

import VideoDialog from './components/VideoDialog';


const videoSelfId = "vid-self";
const videoContactId = "vid-contact";
const serverUrl = "localhost:8081"
render(
<Provider store={configureStore()}>
    <RTCProvider url={serverUrl}  videoSelfId={videoSelfId} videoContactId={videoContactId}>
        <Router history={browserHistory}>
            <Route path="/" component={ChatPage}/>
            <Route path="login" component={LoginPage}/>
        </Router>
        <VideoDialog videoSelfId={videoSelfId} videoContactId={videoContactId}/>



  </RTCProvider>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
