import Login from './Login'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { reduxForm, formValueSelector } from 'redux-form'
import validate from '../../helpers/form-validator'
import { loginHandler } from '../../api'
import setCookie from '../../helpers/set-cookie'

const FORM_NAME = 'Login'
const selector = formValueSelector(FORM_NAME)

export default compose(
  reduxForm({
    form: FORM_NAME,
    validate
  }),
  connect(state => ({
    formValues: selector(state, 'username', 'password')
  })),
  withHandlers({
    handleLogin: ({ formValues: { username, password } }) => () => {
      // console.log(formValues)
      loginHandler(username, password)
        .then(({ success, token, message }) => {
          if(success) {
            setCookie('auth', token)
            window.location.href = '/'
          } else {
            console.log(message)
          }
        })
        .catch(console.error)
    }
  })
)(Login)