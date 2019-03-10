import React from 'react'
import styled from 'styled-components'
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const StyledFormControl = styled(FormControl)`
  && {
    margin-top: 16px;
  }
`

const TextMaskCustom = ({ inputRef, visited, placeholderChar = '_', showMask = false, mask, ...other }) =>
  <MaskedInput
    {...other}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={mask}
    placeholderChar={placeholderChar}
    showMask={showMask}
  />

  const TextMaskedInput = ({
    id,
    input,
    label,
    meta: { error, touched, visited } = {},
    ...props
  }) =>
    <StyledFormControl>
      { label && <InputLabel htmlFor={ id }>{ label }</InputLabel> }
      <Input
        id={ id }
        inputComponent={TextMaskCustom}
        error={ Boolean(error) && touched && error }
        visited={ visited }
        inputProps={{
          ...props
        }}
        { ...input }
        { ...props }
      />
    </StyledFormControl>

export default TextMaskedInput