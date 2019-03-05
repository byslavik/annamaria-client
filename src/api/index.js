import getCook from '../helpers/get-cook'
const mainUrl = 'http://localhost:8083/api'

const request = ({ method, body, url, headers }) => fetch(`${mainUrl}/${url}`, { method, body: JSON.stringify(body),  headers: {
  'Accept': '/',
  'Content-Type': 'application/json',
  'Connection': 'keep-alive',
  'authorization': getCook('authorization')
} })

export const addItem = item => request({ method: 'POST', body: item, url: 'item/add' }).then(res => res.json())

export const getAllItems = () => request({ method: 'GET', url: 'items' }).then(res => res.json())

export const getItemById = id => request({ method: 'GET', url: `items/${id}` }).then(res => res.json())
export const updateItem = item => request({ method: 'POST', body: item, url: `item/edit` }).then(res => res.json())
export const delItem = id => request({ method: 'POST', body: { id }, url: `item/delete` }).then(res => res.json())

export const loginHandler = (username, password) => request({ method: 'POST', body: { username, password }, url: 'signin' }).then(res => res.json())
export const registerHandler = (username, password) => request({ method: 'POST', body: { username, password }, url: 'signup' }).then(res => res.json())
