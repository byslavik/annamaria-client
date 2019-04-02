import React from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'

const DateTimeSelector = ({
  className,
  label,
  onChange,
  date,
  time,
  meta: { error, touched },
}) =>
  <Wrapper className={ className }>
    <StyledTypography>
      {label}
    </StyledTypography>
    <FieldWrapper>
      <StyledField
        id="date-local"
        label={`Дата`}
        type="date"
        name="date"
        value={ date }
        onChange={ onChange }
        onBlur={ onChange }
        error={ Boolean(error) && touched && error }
        InputLabelProps={{
          shrink: true,
        }}
      />
      <StyledField
        id="time-local"
        label={`Время`}
        type="time"
        name="time"
        value={ time }
        onChange={ onChange }
        onBlur={ onChange }
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FieldWrapper>
  </Wrapper>

export default DateTimeSelector

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`

const FieldWrapper = styled.div`
  display: flex;
`

const StyledField = styled(TextField)`
  width: 50%;
`

const StyledTypography = styled(Typography)`
  && {
    margin-bottom: 5px;
  }
`