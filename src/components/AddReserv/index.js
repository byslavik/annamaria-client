import AddReserv from './AddReserv'
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
  PRISE,
  PREPAID,
  ZALOG,
  RESERV_DATE,
  EVENT_DATE,
  COMMENTS,
  PRIMERKA_DATE,
  RETURN_DATE,
  IS_RETURN_DONE,
  IS_VIDACHA_DONE
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
  EVENT_DATE,
  RETURN_DATE
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
    PRIMERKA_DATE,
    RETURN_DATE,
    IS_RETURN_DONE,
    IS_VIDACHA_DONE
  )
})

export default compose(
  updateItems,
  withProps(({ initialItem = {} }) => ({
    initialValues: {
      [PREPAID]: undefined,
      [ZALOG]: undefined,
      [PRISE]: undefined,
      ...initialItem
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
    addReserv: ({ formValues, update, updateItemList, addItem, updateItem, valid, hideModal, initialItem }) => () => {
      if(valid) {
        (
          initialItem ?
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
  }),
  withProps(({
    formValues: {
      dressIds
    }
  }) => ({
    linedIds: dressIds && dressIds.length && dressIds.map(({ id }) => id).join(',')
  }))
)(AddReserv)