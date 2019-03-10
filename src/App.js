import React from 'react';
import styled from 'styled-components'
import { Header, Modal, PrivateRoute, Alerts } from './components'
import { Primerki, Vidacha, Login, Plan } from './pages'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'

const App = () => 
  <Provider store={ store }>
    <Alerts />
    <Modal />
    <Router>
      <Wrapper>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Primerki} />
          <PrivateRoute exact path="/vidachi" component={Vidacha} />
          <PrivateRoute exact path="/plan" component={Plan} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Wrapper>
    </Router>
  </Provider>

export default App;

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`