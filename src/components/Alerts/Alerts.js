import React from 'react';
import styled, { css } from 'styled-components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const TypeIcon = ({ type, className }) => {
  const Icon = variantIcon[type]

  return <Icon className={ className } />
}

const variantColor = {
  success: green[600],
  warning: amber[700],
  error: '#d32f2f',
  info: '#1976d2',
};

const Alerts = ({ alerts = [], handleClose }) =>
  alerts.map(({ message, type }, index) => <Snackbar
      key={ message }
      open
      autoHideDuration={3000}
      onClose={ () => handleClose(index) }
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <StyledSnackbarContent
          type={ type }
          message={
            <Message id={ `message-${index}` }>
              <StyledIcon type={ type } />
              { message }
            </Message>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={ () => handleClose(index) } >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    </Snackbar>)

export default Alerts;

const StyledSnackbarContent = styled(SnackbarContent)`
  && {
    ${props => props.type && css`
        background-color: ${variantColor[props.type]}
    `}
  }
`

const Message = styled.span`
  display: flex;
  align-items: 'center'
`

const StyledIcon = styled(TypeIcon)`
  margin-right: 10px;
`