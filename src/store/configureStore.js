import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'
import { app } from './appReducer'

const reducer = combineReducers({
  app,
  form,
  modal
})

export default function configureStore(predefinedState = {}, history) {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
      compose

  const middleware = [
    // thunk,
    // routerMiddleware(history),
    // ymmeMiddleware,
    // shoppingDataMiddleWare,
    // redirectToCart,
    // authSynchronizationMiddleware,
    // melisaGeolocationMiddleware
  ]

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
  )

  return createStore(
    reducer,
    predefinedState,
    enhancer
  )
}
