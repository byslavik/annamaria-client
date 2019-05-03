import { compose, withStateHandlers, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux'
import CommentWindow from './CommentWindow'
import { addComment, updateComment, getComment } from '../../api'
import dateFormatter from '../../helpers/date-field-formatter'
import { setComment } from './actions'



const mapStateToProps = ({ date, comment }) => ({ date, comment })

export default compose(
  connect(mapStateToProps, { addComment, updateComment, setComment }),
  withStateHandlers({
    justCreated: false,
    isVisible: false
  },{
    setJustCreated: state => value => ({ ...state, justCreated: false }),
    toggle: state => () => ({ ...state, isVisible: !state.isVisible })
  }),
  withHandlers({
    updateHandler: ({ addComment, updateComment, _id, justCreated, setJustCreated}) => data =>
      (_id || justCreated) ?
        updateComment({ ...data, _id }) :
        addComment(data).then(() => setJustCreated(true))
  }),
  withHandlers({
    onValueChange: ({ setComment }) => ({ target: { value: comment } = {}}) => {
      setComment(comment || '')
    },
    onBlur: ({ updateHandler, date, comment}) => () => {
      updateHandler({ comment, date })
    },
  }),
  lifecycle({
    componentDidMount() {
      getComment({ date: dateFormatter(this.props.date) }).then(data => this.props.setComment(data[0] || ''))
    },
    componentDidUpdate({ date }) {
        if(this.props.date !== date) {

          this.props.setComment('')
          getComment({ date: dateFormatter(this.props.date) }).then(data => this.props.setComment(data[0] || ''))
        }
      
    }
  })
)(CommentWindow)