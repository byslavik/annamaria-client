import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, IconButton, Button } from '@material-ui/core';
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
      <Media.Desktop>
        <StyledButton onClick={ toggle }>
          { isVisible ? <CloseIcon /> : <CommentIcon color={ comment ? 'primary' : 'default' } /> }
        </StyledButton>
      </Media.Desktop>
      <Media.Mobile>
        <Button onClick={ toggle } color="primary">Заметки</Button>
      </Media.Mobile>
    {
      isVisible &&
        <TextFieldWrapper>
          <Media.Mobile>
            <StyledButton onClick={ toggle }>
              <CloseIcon />
            </StyledButton>
          </Media.Mobile>

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

  ${Media.mobile`
    position: static;
    width: 100%;
    text-align: center;
  `}
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

  ${Media.mobile`
    position: absolute !important;
    right: 5px;
    top: 5px;
  `}
`

const TextFieldWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border: 4px solid #404fb9;
  width: 300px;
  position: absolute !important;
  top: -3px;
  right: 0;

  ${Media.mobile`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  `}
`