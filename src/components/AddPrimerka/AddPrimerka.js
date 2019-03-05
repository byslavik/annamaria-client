import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Field } from 'redux-form'

const StyledTextField = styled(TextField)`
  display: block;

`

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-top: 23px;
`

const CheckboxComponent = ({ label, ...props }) => <StyledFormControlLabel
  control={
    <Checkbox { ...props } />
  }
  label={ label }
/>

const AddPrimerka = () =>
<Column>
    <Row>
      <Column>
        <Field
          component={ StyledTextField }
          id="clientName"
          name="clientName"
          label="Имя"
          margin="normal"
        />
        <Field
          component={ StyledTextField }
          id="clientPhone"
          name="clientPhone"
          label="Телефон"
          margin="normal"
        />
        <Field
          component={ StyledTextField }
          id="dressIds"
          name="dressIds"
          label="Номера платьев (через запятую)"
          margin="normal"
        />
      </Column>
      <Column>
        <Field
          label="Дата примерки"
          component={ StyledTextField }
          margin="normal"
          id="primerkaDate"
          name="primerkaDate"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Field
          component={ StyledTextField }
          id="eventDate"
          name="eventDate"
          label="Дата съемки/мероприятия"
          margin="normal"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Field
          id="isVidacha"
          name="isVidacha"
          component={ CheckboxComponent }
          label="Выдача"
          margin="normal"
        />
      </Column>
    </Row>

    <Field
      component={ StyledTextField }
      id="comments"
      name="comments"
      multiline
      rows="6"
      label="Комментарии"
      margin="normal"
    />
</Column>

export default AddPrimerka

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;

  & + & {
    margin-left: 10px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`
