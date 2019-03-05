import Modal from './Modal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { connectModal, hide } from 'redux-modal'
import { MODAL } from '../../constant'

export default compose(
  connectModal({ name: MODAL }),
  connect(null, (dispatch) => ({
    hideModal: () => dispatch(hide(MODAL))
  }))
)(Modal)