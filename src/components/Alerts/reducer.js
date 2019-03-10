import { handleActions } from 'redux-actions'
import {
  closeAlert,
  addAlert
} from './actions'

const defaultState = []

const alerts = handleActions({
  [closeAlert]: (state, { payload }) => {
    state.splice(payload, 1)
    
    return [...state]
  },
  [addAlert]: (state, { payload }) => [...state, payload]
}, defaultState)

export default alerts