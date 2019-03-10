import { compose, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import qs from 'qs'
import dateFormatter from '../../helpers/date-field-formatter'
import { withRouter } from 'react-router'
import DateSelector from './DateSelector'
import { changeDate } from './actions'
import { getItems } from '../../actions'


const mapStateToProps = ({
  date,
  app: {
    currentPage
  }
}) => ({ date, currentPage })

export default compose(
  withRouter,
  connect(mapStateToProps, { changeDate, getItems }),
  withHandlers({
    onChange: ({ changeDate, getItems, currentPage, history }) => ({ target: { value }}) => {
      changeDate(value)
      getItems({ date: value, type: currentPage })
      history.push(`?date=${value}`)
    }
  }),
  lifecycle({
    componentDidMount() {
      const { currentPage, changeDate } = this.props
      const { date } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
      const formattedDate = dateFormatter(date || Date.now())
 
      changeDate(formattedDate)
      getItems({ date: formattedDate, type: currentPage })
    }
  })
)(DateSelector)