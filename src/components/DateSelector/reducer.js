import { handleActions } from 'redux-actions'
import { changeDate } from './actions'
import dateFormatter from '../../helpers/date-field-formatter'
import qs from 'qs'

const { date } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
const defaultState = dateFormatter(date || Date.now())

const dateReducer = handleActions({
  [changeDate]: (state, { payload }) => dateFormatter(payload)
}, defaultState)

export default dateReducer