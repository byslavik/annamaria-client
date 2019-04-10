import getCook from '../helpers/get-cook'
import getToken from '../helpers/get-token'
import checkCurrentPage from '../helpers/check-curren-page'
import { handleActions } from 'redux-actions'
import { setCurrentPage, updateItemList, setFetching, updateDressList, dropDressList } from '../actions'

const auth = getCook('auth')

const initialState = {
  isLogged: getToken(auth),
  isFetching: false,
  currentPage: checkCurrentPage(),
  items: [],
  dressList: {}
}

export const app = handleActions({
  [setCurrentPage]: (state, { payload }) => ({...state, currentPage: payload }),
  [updateItemList]: (state, { payload }) => ({...state, items: payload}),
  [setFetching]: (state, { payload }) => ({...state, isFetching: payload}),
  [updateDressList]: (state, { payload }) => {
    const payloadIds = payload.map(({id}) => id)
    const resultIds = { ...state.dressList }

    payloadIds.forEach(id => {
      if (!resultIds[id]) {
        resultIds[id] = 0
      }
      resultIds[id]++
    });

    return {...state, dressList: resultIds}
  },
  [dropDressList]: (state, { payload }) => ({...state, dressList: {}}),
}, initialState)