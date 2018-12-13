import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from 'Root';
import store from 'Store'
import { AUTH_USER } from 'actions/types'



const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER, payload: token});
}


ReactDOM.render(
    <Root>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Root>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
