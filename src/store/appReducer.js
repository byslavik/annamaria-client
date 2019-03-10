import getCook from '../helpers/get-cook'
import getToken from '../helpers/get-token'
import checkCurrentPage from '../helpers/check-curren-page'
import { handleActions } from 'redux-actions'
import { setCurrentPage, updateItemList, setFetching } from '../actions'

const auth = getCook('auth')

const initialState = {
  isLogged: getToken(auth),
  isFetching: false,
  currentPage: checkCurrentPage(),
  items: []
}

export const app = handleActions({
  [setCurrentPage]: (state, { payload }) => ({...state, currentPage: payload }),
  [updateItemList]: (state, { payload }) => ({...state, items: payload}),
  [setFetching]: (state, { payload }) => ({...state, isFetching: payload})
}, initialState)