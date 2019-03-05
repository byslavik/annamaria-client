import React from 'react';
import { Header, Modal, PrivateRoute } from './components'
import { Primerki, Vidacha, Login } from './pages'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore({})

const App = () => 
  <Provider store={ store }>
    <Modal />
    <Router>
      <div>
        <Header />
        <PrivateRoute exact path="/" component={Primerki} />
        <PrivateRoute exact path="/vidachi" component={Vidacha} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  </Provider>

export default App;
