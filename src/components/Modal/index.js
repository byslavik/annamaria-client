import Modal from './Modal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { connectModal, hide } from 'redux-modal'
import { MODAL } from '../../constant'
import withDevice from '../Media/withDevice'

export default compose(
  withDevice,
  connectModal({ name: MODAL }),
  connect(null, (dispatch) => ({
    hideModal: () => dispatch(hide(MODAL))
  }))
)(Modal)