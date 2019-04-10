import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { getItems } from '../actions'

const mapStateToProps = ({
  date,
  app: {
    currentPage
  }
}) => ({ date, currentPage })

export default compose(
  connect(mapStateToProps, { getItems }),
  withHandlers({
    updateItemList: ({ date, getItems, currentPage }) => () => {
      getItems({ date, type: currentPage })
    }
  })
)
