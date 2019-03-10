import AddReserv from './AddReserv'
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
  PRISE,
  PREPAID,
  ZALOG,
  RESERV_DATE,
  EVENT_DATE,
  COMMENTS,
  PRIMERKA_DATE
} from '../../constant'
import { hideModal } from '../Modal/actions'
import updateItems from '../../hocs/withPageUpdate'


const FORM_NAME = 'ADD_RESERV'
const selector = formValueSelector(FORM_NAME)

const FIELDS_TO_VALIDATE = [
  CLIENT_NAME,
  CLIENT_PHONE,
  DRESS_IDS,
  PRISE,
  PREPAID,
  ZALOG,
  RESERV_DATE,
  EVENT_DATE
]

const validate = validateFn(FIELDS_TO_VALIDATE)
const mapStateToProps = state => ({
  formValues: selector(state,
    CLIENT_NAME,
    CLIENT_PHONE,
    DRESS_IDS,
    PRISE,
    PREPAID,
    ZALOG,
    RESERV_DATE,
    EVENT_DATE,
    COMMENTS,
    PRIMERKA_DATE
  )
})

export default compose(
  updateItems,
  withProps(({ initialItem, initialItem: { reservDate, eventDate, dressIds } }) => ({
    initialValues: {
      [PREPAID]: 0,
      [ZALOG]: 0,
      [PRISE]: 0,
      ...initialItem,
      [RESERV_DATE]: reservDate && `${dateFieldFormatter(reservDate)}T${getTime(reservDate)}`,
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
    addReserv: ({ formValues, update, updateItemList, addItem, updateItem, valid, hideModal, initialItem }) => () => {
      if(valid) {
        (
          initialItem && update ?
            updateItem({
              ...initialItem,
              ...prepareItem(formValues, false)
            }) : 
            addItem(prepareItem(formValues, false))
        )
          .then(hideModal)
          .then(updateItemList)
      }

    }
  })
)(AddReserv)