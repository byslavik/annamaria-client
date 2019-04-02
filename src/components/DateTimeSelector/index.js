import DateTimeSelector from './DateTimeSelector'
import { compose, withStateHandlers, withHandlers, lifecycle } from 'recompose'


export default compose(
  withStateHandlers({
    date: '',
    time: ''
  },
  {
    changeDate: state => date => ({ ...state, date }),
    changeTime: state => time => ({ ...state, time }),
  }),
  withHandlers({
    onChange: ({ changeDate, changeTime, date, time, input: { onChange }}) => e => {
      switch(e.target.name) {
        case 'date':
        changeDate(e.target.value)
        onChange({ date: e.target.value, time })

        break;

        case 'time':
        changeTime(e.target.value)
        onChange({ date, time: e.target.value })
        break;

        default: ;
      }
  
    }
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.objValue) {
        const { date, time } = this.props.objValue
  
        this.props.changeDate(date)
        this.props.changeTime(time)
      }
    }
  })
)(DateTimeSelector)