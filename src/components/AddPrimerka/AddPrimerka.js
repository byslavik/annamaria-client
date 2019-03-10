import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form'
import {
  CLIENT_NAME,
  CLIENT_PHONE,
  DRESS_IDS,
  PRIMERKA_DATE,
  IS_VIDACHA,
  EVENT_DATE,
  COMMENTS
} from '../../constant'
import { MaskedInput } from '../'
import Media from '../Media'

const phoneMask = ['+', 3, 7, 5, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/]

const StyledTextField = styled(TextField)`
  display: block;

`

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-top: 23px;
`

const CheckboxComponent = ({ label, ...props }) => <StyledFormControlLabel
  control={
    <Checkbox checked={ props.value } { ...props } />
  }
  label={ label }
/>

const renderField = ({
  input,
  label,
  meta: { error, touched },
  ...props
}) => <StyledTextField
  label={ label }
  error={ Boolean(error) && touched && error }
  { ...input }
  { ...props }
/>

const renderCheckboxField = ({
  input,
  label,
  meta: { error },
  ...props
}) => <CheckboxComponent
  label={ Boolean(error) ? error : label }
  error={ Boolean(error) }
  { ...input }
  { ...props }
/>

const AddPrimerka = ({ initialItem, deleteHandler, handleSubmit, addPrimerka, actionText = 'Добавить' }) =>
  <form onSubmit={handleSubmit(addPrimerka)}>
    <MuiDialogContent>
      <Column>
          <Row>
            <Column>
              <Field
                component={ renderField }
                id={ CLIENT_NAME }
                name={ CLIENT_NAME }
                label="Имя"
                margin="normal"
              />
              <Field
                component={ MaskedInput }
                id={ CLIENT_PHONE }
                name={ CLIENT_PHONE }
                label="Телефон"
                margin="normal"
                mask={ phoneMask }
              />
              <Field
                component={ renderField }
                id={ DRESS_IDS }
                name={ DRESS_IDS }
                label="Номера платьев (через запятую)"
                margin="normal"
              />
            </Column>
            <Column>
              <Field
                label="Дата примерки"
                component={ renderField }
                margin="normal"
                id={ PRIMERKA_DATE }
                name={ PRIMERKA_DATE }
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                component={ renderField }
                id={ EVENT_DATE }
                name={ EVENT_DATE }
                label="Дата съемки/мероприятия"
                margin="normal"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                id={ IS_VIDACHA }
                name={ IS_VIDACHA }
                component={ renderCheckboxField }
                label="Возьмут"
                margin="normal"
              />
            </Column>
          </Row>

          <Field
            component={ renderField }
            id={ COMMENTS }
            name={ COMMENTS }
            multiline
            rows="6"
            label="Комментарии"
            margin="normal"
          />
      </Column>

    </MuiDialogContent>
    <MuiDialogActions>
      {
        initialItem._id &&
          <Button type="button" onClick={ deleteHandler } color="secondary">
            Удалить
          </Button>
        }
      <Button type="submit" color="primary">
        { actionText }
      </Button>
    </MuiDialogActions>
  </form>

export default AddPrimerka

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;

  & + & {
    margin-left: 10px;
  }

  ${Media.mobile`
    margin: 0;
    & + & {
      margin-left: 0;
    }
  `}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;

  ${Media.mobile`
    flex-direction: column;
  `}

`
