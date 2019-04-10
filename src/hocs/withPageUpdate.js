import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { getItems, dropDressList } from '../actions'

const mapStateToProps = ({
  date,
  app: {
    currentPage
  }
}) => ({ date, currentPage })

export default compose(
  connect(mapStateToProps, { getItems, dropDressList }),
  withHandlers({
    updateItemList: ({ date, getItems, currentPage, dropDressList }) => () => {
      getItems({ date, type: currentPage })
      dropDressList()
    }
  })
)
