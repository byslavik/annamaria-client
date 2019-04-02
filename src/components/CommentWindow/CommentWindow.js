import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, IconButton } from '@material-ui/core';
import dateFormatter from '../../helpers/date-formatter';
import Media from '../Media';

const CommentWindow = ({
  comment,
  _id,
  onValueChange,
  onBlur,
  date,
  isVisible,
  toggle
}) =>
  <Wrapper>
    <StyledButton onClick={ toggle }>
      { isVisible ? <CloseIcon /> : <CommentIcon color={ comment ? 'primary' : 'default' } /> }
    </StyledButton>
    {
      isVisible &&
        <TextFieldWrapper>
          <StyledTextField
            rows="20"
            placeholder={`Заметки на ${dateFormatter(date)}`}
            label={`Заметки на ${dateFormatter(date)}`}
            fullWidth
            multiline
            value={ comment }
            onChange={ onValueChange }
            onBlur={ onBlur } />
          </TextFieldWrapper>
    }
  </Wrapper>

export default CommentWindow

const Wrapper = styled.div`
  width: 48px;
  position: relative;
  /* position: fixed;
  top: 123px;
  right: 20px; */
  z-index: 100;

  /* ${Media.mobile`
    top: 70px;
    right: 15px;
  `} */
  @media print {
    display: none;
  }
`

const StyledTextField = styled(TextField)`
  && {
  }
`

const StyledButton = styled(IconButton)`
  position: relative;
  z-index: 10;
`

const TextFieldWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border: 4px solid #404fb9;
  width: 300px;
  position: absolute !important;
  top: -3px;
  right: 0;
`