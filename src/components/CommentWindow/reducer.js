import { handleActions } from 'redux-actions'
import { setComment } from './actions'

const defaultState = ''

const dateReducer = handleActions({
  [setComment]: (state, { payload }) => payload
}, defaultState)

export default dateReducer