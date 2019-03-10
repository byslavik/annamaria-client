import { compose, withStateHandlers, withHandlers, lifecycle } from 'recompose'
import { MOBILE_EDGE } from '../../constant'

const deviceChecker = () => ({
  mobile: window.innerWidth <= MOBILE_EDGE,
  desktop: window.innerWidth > MOBILE_EDGE
})

export default compose(
  withStateHandlers({
    mobile: false,
    desktop: false
  }, {
    setDevice: () => device => device
  }),
  withHandlers({
    changeListener: ({ setDevice }) => () => setDevice(deviceChecker())
  }),
  lifecycle({
    componentDidMount() {
      this.props.changeListener()
      window.addEventListener('resize', this.props.changeListener)
    },

    componentWillUnmount() {
      window.removeEventListener('resize', this.props.changeListener)
    }
  })
)