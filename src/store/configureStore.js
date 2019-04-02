import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'
import { app } from './appReducer'
import alerts from '../components/Alerts/reducer'
import date from '../components/DateSelector/reducer'
import comment from '../components/CommentWindow/reducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  app,
  form,
  modal,
  alerts,
  date,
  comment
})


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
    compose

const middleware = [
  thunk
]

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

const store = createStore(
  reducer,
  enhancer
)

export default store 
