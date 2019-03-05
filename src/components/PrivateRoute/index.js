import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const mapStateToProps = ({ app: { isLogged }}) => ({ isLogged })

export default connect(mapStateToProps)(PrivateRoute)