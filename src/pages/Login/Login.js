import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const renderField = ({
  input,
  label,
  meta: { error },
  ...props
}) => <TextField
  label={ Boolean(error) ? error : label }
  error={ Boolean(error) }
  { ...input }
  { ...props }
  />

const Login = ({ handleLogin, handleSubmit }) =>
  <StyledPaper>
    <Typography variant="h5" component="h3">
        Введите логин и Пароль
    </Typography>
    <form onSubmit={ handleSubmit(handleLogin) }>
      <p>
        <Field
          fullWidth
          component={ renderField }
          name="username"
          placeholder="Логин"
          label="Логин"
        />
      </p>
      <p>
        <Field
          fullWidth
          component={ renderField }
          name="password"
          type="password"
          placeholder="Пароль"
          label="Пароль"
        />
      </p>
      <Button type="submit" fullWidth color="primary">
        Вход
      </Button>
    </form>
  </StyledPaper>

export default Login

const StyledPaper = styled(Paper)`
  width: 300px;
  padding: 30px 20px;
  margin: 40px auto;
`
