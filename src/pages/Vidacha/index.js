import React from 'react'
import Vidacha from './Vidacha'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers, lifecycle, withStateHandlers } from 'recompose'
import { show } from 'redux-modal'
import { MODAL, RESERV } from '../../constant'
import { AddReserv, DetailsReservContent } from '../../components'
import { setCurrentPage, getItems } from '../../actions' 
import dateFormatter from '../../helpers/date-formatter'
import updateItems from '../../hocs/withPageUpdate'
import { addItem } from '../../api'
import getTime from '../../helpers/get-time'
import { ClientPhone } from '../../components/common'

const mapStateToProps = ({
  date,
  app: {
    items
  }
}) => ({ date, items })

const columns = [
  {
    label: 'Время',
    renderFn: ({ eventDate }) => getTime(eventDate)
  },
  {
    label: 'Клиент',
    renderFn: item =>
      <>
        <b>{item.clientName}</b>
        <br/>
        <ClientPhone>{item.clientPhone}</ClientPhone>
      </>
  },
  {
    label: 'Номера платьев',
    renderFn: ({ dressIds }) => dressIds.join(', ')
  },
  {
    label: 'Оплата',
    renderFn: ({ prise, prepaid, zalog }) =>
      <>
        { prise && <><b>Сумма</b>: { prise } <br/></>}
        { prepaid && <><b>Предоплата</b>: { prepaid } <br/></>}
        { zalog && <><b>Залог</b>: { zalog } <br/></>}
      </>
  },
  {
    label: 'Комментарии',
    renderFn: ({ comments = '' }) => <p dangerouslySetInnerHTML={{ __html: comments.replace(/(?:\r\n|\r|\n)/g, '<br/>') }} />
  }]



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
        reservDate: new Date(`${date} ${value}`),
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
      title: 'Добавить Бронь',
      Content: () => <AddReserv update={ update } initialItem={ item } />,
      actionText: 'Добавить',
    }),
    openDetailsModal: ({ show }) => item =>  show(MODAL, {
      title: 'Детали брони',
      Content: () => <DetailsReservContent item={ item } {...item} />,
      actionText: 'Закрыть'
    }),
    dblClkHanlder: ({ enableRowFn }) => () => {
      enableRowFn()
    }
  }),
  withProps({
    columns
  }),
  lifecycle({
    componentDidMount() {
      const { setCurrentPage, getItems, date } = this.props

      setCurrentPage(RESERV)
      getItems({ type: RESERV, date })
    }
  })
)(Vidacha)