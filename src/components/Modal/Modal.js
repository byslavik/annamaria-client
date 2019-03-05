import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
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

const Modal = ({ action, hideModal, title, actionText, show, Content }) =>
  <Dialog
    maxWidth="md"
    onClose={hideModal}
    aria-labelledby="customized-dialog-title"
    open={show}
  >
    <DialogTitle id="customized-dialog-title" onClose={hideModal}>
      { title }
    </DialogTitle>
    <MuiDialogContent>
      <Content />
    </MuiDialogContent>
    <MuiDialogActions>
      <Button onClick={action} color="primary">
        { actionText }
      </Button>
    </MuiDialogActions>
  </Dialog>

export default Modal