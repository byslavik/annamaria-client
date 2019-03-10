import { getAllItems } from './api'
import { createAction } from 'redux-actions'

export const updateItemList = createAction('ITEMS/UPDATE_ITEM_LIST')
export const setCurrentPage = createAction('APP/SET_CURRENT_PAGE')
export const setFetching = createAction('APP/SET_FETCHING')

export const getItems = ({ date, type }) => dispatch => {
  dispatch(setFetching(true))
  getAllItems({ date, type })
    .then(items => dispatch(updateItemList(items)))
    .finally(() => dispatch(setFetching(false)))
}