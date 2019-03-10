import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import Alerts from './Alerts'
import { closeAlert } from './actions'

const mapStateToProps = ({ alerts }) => ({ alerts })

export default compose(
  connect(mapStateToProps, { closeAlert }),
  withHandlers({
    handleClose: ({ closeAlert }) => id => closeAlert(id)
  })
)(Alerts)