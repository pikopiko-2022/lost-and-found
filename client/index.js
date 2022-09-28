import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/index.css'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain="pikopiko-2022-david.au.auth0.com"
      clientId="KJ9CSWBpNRIwuzrEOUWQB6DGniH6RMg2"
      redirectUri={window.location.origin}
      audience="https://lost-and-found/api"
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>,

    document.getElementById('app')
  )
})
