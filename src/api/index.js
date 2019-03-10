import qs from 'qs'
import getCook from '../helpers/get-cook'
import { addAlert } from '../components/Alerts/actions'
import { setFetching } from '../actions'
const mainUrl = 'https://anna-maria-server.herokuapp.com/api'

const errMsg = 'Что-то пошло не так'

const request = ({ method, body, url, search, headers }) =>
fetch(`${mainUrl}/${url}${search ? `?${search}` : ''}`, { method, body: JSON.stringify(body),  headers: {
  'Accept': '/',
  'Content-Type': 'application/json',
  'Connection': 'keep-alive',
  'authorization': getCook('auth')
} })

export const addItem = item => dispatch => {
  dispatch(setFetching(true))

  return request({ method: 'POST', body: item, url: 'item/add' })
    .then(res => res.json())
    .then(({ type, message }) => dispatch(addAlert({ type, message })))
    .catch(({ message }) => dispatch(addAlert({ type: 'error', message: message || errMsg })))
    .finally(() => dispatch(setFetching(false)))
}


export const getAllItems = params => request({ method: 'GET', url: 'items', search: qs.stringify(params) }).then(res => res.json())

export const getItemById = id => request({ method: 'GET', url: `items/${id}` }).then(res => res.json())
export const updateItem = item => dispatch => {
  dispatch(setFetching(true))

  return request({ method: 'PATCH', body: item, url: `item/edit` })
    .then(res => res.json())
    .then(({ type, message }) => dispatch(addAlert({ type, message })))
    .catch(({ message }) => dispatch(addAlert({ type: 'error', message: message || errMsg })))
    .finally(() => dispatch(setFetching(false)))
}
export const delItem = id => dispatch =>
  request({ method: 'DELETE', body: { id }, url: `item/delete` })
    .then(res => res.json())
    .then(({ type, message }) => dispatch(addAlert({ type, message })))
    .catch(({ message }) => dispatch(addAlert({ type: 'error', message: message || errMsg })))

export const loginHandler = (username, password) => request({ method: 'POST', body: { username, password }, url: 'signin' }).then(res => res.json())
export const registerHandler = (username, password) => request({ method: 'POST', body: { username, password }, url: 'signup' }).then(res => res.json())
