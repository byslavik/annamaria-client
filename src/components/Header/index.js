import Header from './Header'
import { compose, renderNothing, branch } from 'recompose'
import { connect } from 'react-redux';

const mapStateToProps = ({ app: { isLogged }}) => ({ isLogged })

export default compose(
  connect(mapStateToProps),
  branch(
    ({ isLogged }) => !isLogged,
    renderNothing
  ),
)(Header)