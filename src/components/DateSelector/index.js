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
      const formattedDate = dateFormatter(value)

      changeDate(formattedDate)
      getItems({ date: formattedDate, type: currentPage })
      history.push(`?date=${formattedDate}`)
    }
  }),
  lifecycle({
    componentDidMount() {
      const { currentPage, changeDate } = this.props
      const { date } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
      if (date) {
        const formattedDate = dateFormatter(date)
    
        changeDate(formattedDate)
        getItems({ date: formattedDate, type: currentPage })
      }
    }
  })
)(DateSelector)