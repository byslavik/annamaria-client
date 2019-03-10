import React from 'react'
import Primerki from './Primerki'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle, withStateHandlers } from 'recompose'
import { show } from 'redux-modal'
import { MODAL, PRIMERKA } from '../../constant'
import { AddPrimerka, DetailsModalContent } from '../../components'
import { setCurrentPage, getItems } from '../../actions' 
import updateItems from '../../hocs/withPageUpdate'
import { addItem } from '../../api'

const mapStateToProps = ({
  date,
  app: {
    items
  }
}) => ({ date, items })

export default compose(
  updateItems,
  connect(mapStateToProps, { show, setCurrentPage, getItems, addItem }),
  withStateHandlers({
    enableRow: false,
    timeValue: ''
  },
  {
    enableRowFn: (state) => () => ({ ...state, enableRow: true }),
    disableRow: (state) => () => ({ ...state, enableRow: false }),
    onTimeFieldChage: state => ({ target: { value }}) => ({ ...state, timeValue: value }),
    onTimeFieldBlur: (state, { addItem, date, updateItemList, currentPage }) => ({ target: { value }}) => {
      const isFilled = value.length === 5
    
      isFilled && addItem({
        primerkaDate: new Date(`${date} ${value}`),
        placeholder: true,
        type: currentPage
      }).then(updateItemList)
  
      return ({
        ...state,
        enableRow: !isFilled,
        timeValue: isFilled ? '' : value
      })
    }
  }),
  withHandlers({
    openCreateModal: ({ show }) => (item, update) => show(MODAL, {
      title: 'Добавить примерку',
      Content: () => <AddPrimerka update={ update } initialItem={ item } />,
      actionText: 'Добавить',
    }),
    openDetailsModal: ({ show }) => item =>  show(MODAL, {
      title: 'Детали примерки',
      Content: () => <DetailsModalContent item={ item } {...item} />,
      actionText: 'Закрыть'
    }),
    dblClkHanlder: ({ enableRowFn }) => () => {
      enableRowFn()
    }
  }),
  lifecycle({
    componentDidMount() {
      const { setCurrentPage, getItems, date } = this.props

      setCurrentPage(PRIMERKA)
      getItems({ type: PRIMERKA, date })
    }
  })
)(Primerki)