import React from 'react'
import Vidacha from './Vidacha'
import qs from 'qs'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers, lifecycle, withStateHandlers } from 'recompose'
import { show } from 'redux-modal'
import { MODAL, RESERV } from '../../constant'
import { AddReserv, DetailsReservContent } from '../../components'
import { setCurrentPage, getItems, dropDressList, updateDressList } from '../../actions' 
import dateFormatter from '../../helpers/date-formatter'
import updateItems from '../../hocs/withPageUpdate'
import { addItem } from '../../api'
import { ClientPhone, DressList, PriceHolder } from '../../components/common'

const mapStateToProps = ({
  date,
  app: {
    items
  }
}) => ({ date, items })

const columns = [
  {
    label: 'Время',
    renderFn: ({ eventDate: { time } = {} }) => time
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
    renderFn: ({ dressIds }) => {
      const { dressIds: searchDressIds } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
      const searchIds = searchDressIds ? searchDressIds.split(',') : []

      return <DressList highlisghtYellow searchIds={ searchIds } items={ dressIds } />
    } 
  },
  {
    label: 'Оплата',
    renderFn: ({ prise, prepaid, zalog }) =>
      <PriceHolder prise={ prise } prepaid={ prepaid } zalog={ zalog } />
  },
  {
    label: 'Дата выдачи',
    renderFn: ({ reservDate }) => dateFormatter(reservDate)
  },
  {
    label: 'Дата возврата',
    renderFn: ({ returnDate }) => dateFormatter(returnDate)
  },
  {
    label: 'Комментарии',
    renderFn: ({ comments = '' }) => <p dangerouslySetInnerHTML={{ __html: comments.replace(/(?:\r\n|\r|\n)/g, '<br/>') }} />
  }]



export default compose(
  updateItems,
  connect(mapStateToProps, { show, setCurrentPage, getItems, addItem, dropDressList, updateDressList }),
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
        eventDate: {
          date,
          time: value
        },
        isPrimerkaDone: true,
        placeholder: true,
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
    },
    componentDidUpdate({ items: prevItems }) {
      if (this.props.items.length !== prevItems.length) {
        const dressIds = this.props.items.reduce((acc, item) => [...acc, ...item.dressIds], [])
        this.props.dropDressList()
        this.props.updateDressList(dressIds)
      }
    }
  })
)(Vidacha)