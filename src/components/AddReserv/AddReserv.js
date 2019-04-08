import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form'
import {
  CLIENT_NAME,
  CLIENT_PHONE,
  DRESS_IDS,
  PRISE,
  PREPAID,
  ZALOG,
  RESERV_DATE,
  EVENT_DATE,
  COMMENTS,
  PRIMERKA_DATE,
  RETURN_DATE,
  IS_RETURN_DONE,
  IS_VIDACHA_DONE
} from '../../constant'
import { MaskedInput, DateTimeSelector, DressSizeSelector } from '..'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Media from '../Media'
import { Typography } from '@material-ui/core';
import dateFormatter from '../../helpers/date-field-formatter';

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

const AddPrimerka = ({ linedIds, handleSubmit, initialItem = {}, deleteHandler, addReserv, actionText = 'Бронировать', formValues }) =>
  <form onSubmit={handleSubmit(addReserv)}>
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
            </Column>
            <Column>
              {
                formValues[PRIMERKA_DATE] &&
                  <Primerka>
                    <b>Дата примерки: </b> {dateFormatter(formValues[PRIMERKA_DATE].date)}
                  </Primerka>
              }
              <Field
                component={ DressSizeSelector }
                id={ DRESS_IDS }
                name={ DRESS_IDS }
                objValue={ initialItem[DRESS_IDS] }
                label="Номера платьев"
                margin="normal"
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Field
                component={ renderField }
                id={ PRISE }
                name={ PRISE }
                label="Стоимость"
                margin="normal"
                type="number"
              />
              <Field
                component={ renderField }
                id={ ZALOG }
                name={ ZALOG }
                label="Залог"
                margin="normal"
                type="number"
              />
              
            </Column>
            <Column>
              <Field
                  component={ renderField }
                  id={ PREPAID }
                  name={ PREPAID }
                  label="Предоплата"
                  margin="normal"
                  type="number"
                />
                {
                  formValues[PRISE] && formValues[PREPAID] &&
                    <Primerka>
                      <b>Осталось:</b> { formValues[PRISE] - formValues[PREPAID] }
                    </Primerka>
                }

            </Column>
          </Row>
        <Row>
          <Column>
              <Field
                id={ IS_VIDACHA_DONE }
                name={ IS_VIDACHA_DONE }
                component={ renderCheckboxField }
                label="Выдано"
                margin="normal"
              />
            </Column>

          <Column>
              <Field
                id={ IS_RETURN_DONE }
                name={ IS_RETURN_DONE }
                component={ renderCheckboxField }
                label="Возвращено"
                margin="normal"
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Field
                component={ DateTimeSelector }
                id={ RESERV_DATE }
                objValue={ initialItem.reservDate }
                name={ RESERV_DATE }
                label="Выдача"
                InputLabelProps={{
                  shrink: true,
                }} />

              <Field
                component={ DateTimeSelector }
                id={ EVENT_DATE }
                name={ EVENT_DATE }
                objValue={ initialItem.eventDate }
                label="Съемка/мероприятие"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Column>
            <Column>
              { 
                formValues[EVENT_DATE] &&
                  <StyledButton
                    color="secondary"
                    variant="contained"
                    component="a"
                    href={`/vidachi?date=${dateFormatter(formValues[EVENT_DATE].date)}${linedIds ? `&dressIds=${linedIds}` : ''}`}
                    rel="noopener noreferrer"
                    target="_blank">
                      Посмотреть брони на {dateFormatter(formValues[EVENT_DATE].date)}
                  </StyledButton>
              }
              
              <Field
                component={ DateTimeSelector }
                objValue={ initialItem.returnDate }
                id={ RETURN_DATE }
                name={ RETURN_DATE }
                label="Возврат"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }} />
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

const Primerka = styled(Typography)`
  && {
    margin-top: 35px;
    margin-bottom: 17px;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;

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

const StyledButton = styled(Button)`
  && {
    margin-top: 27px;
  }
`
