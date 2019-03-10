import Header from './Header'
import { compose, renderNothing, withStateHandlers, branch } from 'recompose'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

const mapStateToProps = ({ app: { isLogged, isFetching }}) => ({ isLogged, isFetching })

export default compose(
  connect(mapStateToProps),
  withStateHandlers({
    isMobileMenuOpen: false,
    targetEl: null
  },
  {
    toggleMenu: ({ isMobileMenuOpen }) => e =>
    ({
      isMobileMenuOpen: !isMobileMenuOpen,
      targetEl: e.nativeEvent.target && e.nativeEvent.target
    })
  }),
  withRouter,
  branch(
    ({ isLogged }) => !isLogged,
    renderNothing
  ),
)(Header)