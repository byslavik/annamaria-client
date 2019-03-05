import AddPrimerka from './AddPrimerka'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form'

export default compose(
  reduxForm({
    form: 'ADD_PRIMERKA'
  })
)(AddPrimerka)