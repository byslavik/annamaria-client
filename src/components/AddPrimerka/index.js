import AddPrimerka from './AddPrimerka'
import { compose, withHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { addItem, updateItem, delItem } from '../../api'
import validateFn from '../../helpers/form-validator'
import prepareItem from '../../helpers/prepare-item'
import {
  CLIENT_NAME,
  CLIENT_PHONE,
  DRESS_IDS,
  PRIMERKA_DATE,
  IS_VIDACHA,
  EVENT_DATE,
  COMMENTS
} from '../../constant'
import { hideModal } from '../Modal/actions'
import updateItems from '../../hocs/withPageUpdate'

const FORM_NAME = 'ADD_PRIMERKA'
const selector = formValueSelector(FORM_NAME)

const FIELDS_TO_VALIDATE = [
  CLIENT_NAME,
  CLIENT_PHONE,
  DRESS_IDS,
  PRIMERKA_DATE,
  EVENT_DATE
]

const validate = validateFn(FIELDS_TO_VALIDATE)
const mapStateToProps = state => ({
  formValues: selector(state,
      CLIENT_NAME,
      CLIENT_PHONE,
      DRESS_IDS,
      PRIMERKA_DATE,
      IS_VIDACHA,
      EVENT_DATE,
      COMMENTS
    )
})

export default compose(
  updateItems,
  withProps(({ initialItem = {} }) => ({
    initialValues: {
      ...initialItem,
      isPrimerkaDone: false
    }
  })),
  reduxForm({
    form: FORM_NAME,
    validate
  }),
  connect(mapStateToProps, { addItem, hideModal, updateItem, delItem }),
  withHandlers({
    deleteHandler: ({ delItem, hideModal, updateItemList, initialItem: { _id } = {} }) => () =>
      delItem(_id)
        .then(hideModal)
        .then(updateItemList),
    addPrimerka: ({ formValues, update, updateItemList, addItem, updateItem, valid, hideModal, initialItem }) => () => {
      if(valid) {
        (
          initialItem ?
            updateItem({
              ...initialItem,
              ...prepareItem(formValues)
            }) : 
            addItem(prepareItem(formValues, true))
        )
          .then(hideModal)
          .then(updateItemList)
        }
    }

  })
)(AddPrimerka)