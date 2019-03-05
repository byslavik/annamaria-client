import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ isLogged, ...rest }) => (
  isLogged ?
    <Route {...rest} /> :
    <Redirect to='/login' />
)

export default PrivateRoute