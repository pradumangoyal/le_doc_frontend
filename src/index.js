import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import {createStore, applyMiddleware} from'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter as Router} from 'react-router-dom'

import rootReducers from './reducers'
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducers, applyMiddleware(thunk))
ReactDOM.render(
<Provider store={store}>
<Router>
    <App />
</Router>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
