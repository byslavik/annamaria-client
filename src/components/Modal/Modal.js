import React from 'react'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogWrapper = styled(MuiDialogTitle)`
  display: flex;
  align-items: center;
`

const StyledClose = styled(IconButton)`
  && {
    position: absolute;
    right: 10px;
  }
`

const DialogTitle = ({ onClose, children }) =>
 <DialogWrapper disableTypography >
  <Typography variant="h6">{children}</Typography>
  {onClose ? (
    <StyledClose aria-label="Закрыть" onClick={onClose}>
      <CloseIcon />
    </StyledClose>
  ) : null}
  </DialogWrapper>

const Modal = ({ mobile, hideModal, title, show, Content }) =>
  <Dialog
    fullScreen={ mobile }
    maxWidth="xl"
    onClose={hideModal}
    aria-labelledby="customized-dialog-title"
    open={show}
  >
    <DialogTitle id="customized-dialog-title" onClose={hideModal}>
      { title }
    </DialogTitle>
    <Content />
  </Dialog>

export default Modal