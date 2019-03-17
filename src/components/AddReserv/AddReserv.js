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
  RETURN_DATE
} from '../../constant'
import { MaskedInput } from '..'
import Media from '../Media'
import { Typography } from '@material-ui/core';
import dateFormatter from '../../helpers/date-field-formatter';

const phoneMask = ['+', 3, 7, 5, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/]

const StyledTextField = styled(TextField)`
  display: block;

`

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

const AddPrimerka = ({ handleSubmit, initialItem, deleteHandler, addReserv, actionText = 'Бронировать', formValues }) =>
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
              <Field
                component={ renderField }
                id={ DRESS_IDS }
                name={ DRESS_IDS }
                label="Номера платьев (через запятую)"
                margin="normal"
              />
            </Column>
            <Column>
              {
                formValues[PRIMERKA_DATE] &&
                  <Primerka>
                    <b>Дата примерки: </b> {dateFormatter(formValues[PRIMERKA_DATE])}
                  </Primerka>
              }
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
              <Primerka>
                 <b>Осталось:</b> { formValues[PRISE] - formValues[PREPAID] }
              </Primerka>

            </Column>
          </Row>
          <Row>
            <Column>
              <Field
                component={ renderField }
                id={ RESERV_DATE }
                name={ RESERV_DATE }
                label="Предполагаемая выдача"
                margin="normal"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }} />
            </Column>
            <Column>
              { 
                formValues[RESERV_DATE] &&
                  <StyledButton
                    color="secondary"
                    variant="contained"
                    component="a"
                    href={`/vidachi?date=${dateFormatter(formValues[RESERV_DATE])}`}
                    rel="noopener noreferrer"
                    target="_blank">
                      Посмотреть выдачи на {dateFormatter(formValues[RESERV_DATE])}
                  </StyledButton>
              }
              
              <Field
                component={ renderField }
                id={ RETURN_DATE }
                name={ RETURN_DATE }
                label="Предполагаемый возврат"
                margin="normal"
                type="datetime-local"
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

const StyledButton = styled(Button)`
  && {
    margin-top: 27px;
  }
`
