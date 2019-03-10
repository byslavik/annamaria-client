import React from 'react'
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'
import Media from '../Media'


const DateSelector = ({ date, onChange, ...rest }) =>
  <Wrapper>
    <StyledField
      id="date-local"
      label="Дата примерки"
      type="date"
      name="date"
      value={ date }
      onChange={ onChange }
      InputLabelProps={{
        shrink: true,
      }}
    />
  </Wrapper>


export default DateSelector

const Wrapper = styled.div`
  @media print {
    display: none;
  }
`

const StyledField = styled(TextField)`
  ${Media.mobile`
    width: 100%;
  `}
`