import AddPrimerka from './AddPrimerka'
import { compose, withHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { addItem, updateItem, delItem } from '../../api'
import validateFn from '../../helpers/form-validator'
import prepareItem from '../../helpers/prepare-item'
import getTime from '../../helpers/get-time'
import dateFieldFormatter from '../../helpers/date-field-formatter'
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
  withProps(({ initialItem, initialItem: { primerkaDate, eventDate, dressIds } }) => ({
    initialValues: {
      ...initialItem,
      [PRIMERKA_DATE]: `${dateFieldFormatter(primerkaDate)}T${getTime(primerkaDate)}`,
      [EVENT_DATE]: `${dateFieldFormatter(eventDate)}T${getTime(eventDate)}`,
      [DRESS_IDS]: dressIds && dressIds.join(', ')
    }
  })),
  reduxForm({
    form: FORM_NAME,
    validate
  }),
  connect(mapStateToProps, { addItem, hideModal, updateItem, delItem }),
  withHandlers({
    deleteHandler: ({ delItem, hideModal, updateItemList, initialItem: { _id } }) => () =>
      delItem(_id)
        .then(hideModal)
        .then(updateItemList),
    addPrimerka: ({ formValues, update, updateItemList, addItem, updateItem, valid, hideModal, initialItem }) => () => {
      if(valid) {
        (
          initialItem && update ?
            updateItem({
              ...initialItem,
              ...prepareItem(formValues)
            }) : 
            addItem(prepareItem(formValues))
        )
          .then(hideModal)
          .then(updateItemList)
        }
    }

  })
)(AddPrimerka)