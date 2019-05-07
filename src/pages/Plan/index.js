import React from 'react'
import Plan from './Plan'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { compose, withProps, withHandlers, lifecycle } from 'recompose'
import { show } from 'redux-modal'
import { MODAL, PLAN, PRIMERKA_DATE, RESERV_DATE, RETURN_DATE, TYPE_MAP } from '../../constant'
import { AddPrimerka, AddReserv, DetailsReservContent, DetailsModalContent } from '../../components'
import { ClientPhone, DressList, StyledChip, PriceHolder } from '../../components/common'
import { setCurrentPage, getItems } from '../../actions' 
import dateFormatter from '../../helpers/date-formatter'
import IsVidachaIcon from '@material-ui/icons/Today';
import { CallMade, CallReceived } from '@material-ui/icons'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

const getItemTypes = ({
  primerkaDate = {},
  reservDate = {},
  returnDate = {},
  date: currentDate
}) => {
  const values = {
    [PRIMERKA_DATE]: primerkaDate,
    [RESERV_DATE]: reservDate,
    [RETURN_DATE]: returnDate
  }


  return Object
    .keys(values)
    .filter(key => values[key].date === currentDate)
}


const StyledInfoIcon = styled(InfoIcon)`
  @media print {
    display: none !important;
  }
`

const getItemTypesMapped = ({
  primerkaDate = {},
  reservDate = {},
  returnDate = {},
  date: currentDate
}) => {
  const values = {
    [PRIMERKA_DATE]: primerkaDate,
    [RESERV_DATE]: reservDate,
    [RETURN_DATE]: returnDate
  }

  return Object
    .keys(values)
    .filter(key => values[key].date === currentDate)
    .map(key => ({ ...TYPE_MAP[key], time: values[key].time }))
}


const mapStateToProps = ({
  date,
  app: {
    items
  }
}) => ({ date, items })

export default compose(
  connect(mapStateToProps, { show, setCurrentPage, getItems }),
  withHandlers({
    openCreateModal: ({ show }) => () => show(MODAL, {
      title: 'Добавить примерку',
      Content: () => <AddPrimerka update={ false } />,
      actionText: 'Добавить',
    }),
    openCreateReservModal: ({ show }) => () => show(MODAL, {
      title: 'Добавить Бронь',
      Content: () => <AddReserv  update={ false } />,
      actionText: 'Добавить',
    }),
    // openDetailsModal: () => () => isPrimerkaDone ? openDetailsReservModal : openDetailsModal
  }),
  withProps(({ items, date }) => {
    const itemsWithutPlaceholders = items
      .filter(({ placeholder }) => !placeholder)

    const filteredItems = itemsWithutPlaceholders
      .filter(item => {
        const currentItemTypes = getItemTypes({ ...item, date })
        const sortField = currentItemTypes[0]

        return Boolean(item[sortField].time)
      })
      .sort((item, nextItem) => {
        const currentItemTypes = getItemTypes({ ...item, date })
        const nextItemTypes = getItemTypes({ ...nextItem, date })
        const sortField = currentItemTypes[0]
        const nextSortField = nextItemTypes[0]
        const curDateParsed = Date.parse(item[`${sortField}Str`])
        const nextDateParsed = Date.parse(nextItem[`${nextSortField}Str`])

        if( curDateParsed > nextDateParsed) {
          return 1
        } else if(curDateParsed < nextDateParsed) {
          return -1
        }

        return 0
      })

    const itemsWithoutTime = itemsWithutPlaceholders
      .filter(item => {
        const currentItemTypes = getItemTypes({ ...item, date })
        const sortField = currentItemTypes[0]

        return !item[sortField].time
      })

      return { items: [ ...filteredItems, ...itemsWithoutTime  ]}
  }),
  withHandlers({
    openDetailsReservModal: ({ show }) => item => show(MODAL, {
      title: 'Детали брони',
      Content: () => <DetailsReservContent item={ item } { ...item }  />,
      actionText: 'Закрыть'
    }),
    openDetailsModal: ({ show }) => item => show(MODAL, {
      title: 'Детали примерки',
      Content: () => <DetailsModalContent item={ item } { ...item }  />,
      actionText: 'Закрыть'
    })
  }),
  withProps(({ date, openDetailsReservModal, openDetailsModal }) => ({
    columns: [
      {
        label: ' ',
        renderFn: item =>
          <div style={ { display: 'flex' } } >
          <IconButton onClick={ item.isPrimerkaDone ? () => openDetailsReservModal(item) : () => openDetailsModal(item) }>
            <StyledInfoIcon />
          </IconButton>
          { 
            item.isVidacha &&
            !item.isVidachaDone &&
            !item.isReturnDone &&
            !getItemTypesMapped({ date, ...item }).some(({ label }) => label === 'Возврат' || label === 'Выдача') &&
              <IsVidachaIcon />
          }
          { item.isVidachaDone && <CallMade title="Примерка прошла"  /> }
          { item.isReturnDone && <CallReceived title="С выдачей"/> }
          </div>
      },
      {
        label: 'Дата мероприятия',
        renderFn: ({ eventDate }) => eventDate && eventDate.date && dateFormatter(eventDate)
      },
      {
        label: ' ',
        renderFn: (item) =>
          <div style={ { display: 'flex' } } >
          {
            getItemTypesMapped({date, ...item}).map((item, index) => <StyledChip key={ index } { ...item } label={ [item.label, item.time].join(' ') } />)
          }
          </div>
      },

      {
        label: 'Клиент',
        renderFn: item =>
          <span>
            <b>{item.clientName}</b>
            <br/>
            <ClientPhone>{item.clientPhone}</ClientPhone>
          </span>
      },
      {
        label: 'Номера платьев',
        renderFn: ({ dressIds }) => <DressList highlisghtYellow items={ dressIds } /> 
      },
      {
        label: 'Оплата',
        renderFn: ({ prise, prepaid, zalog }) => (prise || prepaid || zalog) &&
          <PriceHolder prise={ prise } prepaid={ prepaid } zalog={ zalog } />
      },
      {
        label: 'Комментарии',
        renderFn: ({ comments = '' }) => <p dangerouslySetInnerHTML={{ __html: comments.replace(/(?:\r\n|\r|\n)/g, '<br/>') }} />
      }
    ]
  })),
  lifecycle({
    componentDidMount() {
      const { setCurrentPage, getItems, date } = this.props
      
      setCurrentPage(PLAN)
      getItems({ type: PLAN, date })
    }
  })
)(Plan)