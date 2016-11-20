import React from 'react'
import ReactDOM from 'react-dom'

import createReduxStore from 'utils/create-redux-store'
import createRoutes from 'utils/create-routes'
import createHistory from 'utils/create-history'
import getInitialState from 'utils/get-initial-state'

import RootRoute from 'routes/Root'
import AppContainer from 'containers/AppContainer'

import './index.css'

# ==============================================================================
# Redux store initiation:
# ==============================================================================
store = createReduxStore { state: getInitialState() }

# ==============================================================================
# Routes initiation with redux store:
# ==============================================================================
routes = createRoutes store, RootRoute

# ==============================================================================
# Browser location history initiation with redux store for react-router:
# ==============================================================================
# - We are passing store because `react-router-redux` is being used
# - It uses a special helper to listen and update route changes in redux-store
# - Notes:
#   * don't forget to include `react-router-redux` middleware
#   * don't forget to include `react-router-redux` reducer as `routing` reducer.
# ==============================================================================
history = createHistory store

# ==============================================================================
# Routes initiation with redux store:
# ==============================================================================
ReactDOM.render(
  React.createElement(AppContainer, { store, routes, history })
  document.getElementById('root')
)