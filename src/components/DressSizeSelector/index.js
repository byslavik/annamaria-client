import DressSizeSelector from './DressSizeSelector'
import { compose, withStateHandlers, withHandlers, lifecycle } from 'recompose'


export default compose(
  withStateHandlers({
    sizes: [],
    idField: '',
    sizeField: '',
  },
  {
    addSize: state => size => ({ ...state, sizes: [...state.sizes, size] }),
    setSizes: state => sizes => ({ ...state, sizes }),
    onIdChange: state => ({ target: { value } }) => ({ ...state, idField: value }),
    onSizeChange: state => ({ target: { value } }) => ({ ...state, sizeField: value }),
    resetFields:  state => () => ({ ...state, idField: '', sizeField: '' }),
  }),
  withHandlers({
    onAddSize: ({ sizes, idField, resetFields, sizeField, addSize, input: { onChange }}) => e => {
      const id = idField && idField.trim()
      const size = sizeField && sizeField.trim()

      if(idField) {
        addSize({ id, size })
        onChange([...sizes, { id, size }])
        resetFields()
      }
    },
    onItemRemove: ({ sizes, setSizes, input: { onChange }}) => i => {
      const modifiedSizes = sizes.filter((item, index) => i !== index )

      setSizes(modifiedSizes)
      onChange(modifiedSizes)
    }
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.objValue) {
        this.props.setSizes(this.props.objValue)
      }
    }
  })
)(DressSizeSelector)