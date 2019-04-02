import React from 'react'
import PlanItem from './PlanItem'
import { compose, withProps, withHandlers } from 'recompose';
import { show } from 'redux-modal'
import { connect } from 'react-redux'
import { TYPE_MAP, PRIMERKA_DATE, RESERV_DATE, RETURN_DATE, MODAL } from '../../constant'
import { DetailsReservContent, DetailsModalContent } from '../../components'

const getItemTypes = ({
  primerkaDate = {},
  reservDate = {},
  returnDate = {},
  currentDate
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

export default compose(
  connect(null, { show }),
  withProps(({
    primerkaDate,
    reservDate,
    returnDate,
    currentDate
  }) => ({
    itemTypes: getItemTypes({
      primerkaDate,
      reservDate,
      returnDate,
      currentDate
    })
  })),
  withHandlers({
    openDetailsReservModal: ({ show, ...rest }) => () =>  show(MODAL, {
      title: 'Детали брони',
      Content: () => <DetailsReservContent item={ rest } {...rest} />,
      actionText: 'Закрыть'
    }),
    openDetailsModal: ({ show, ...rest }) => () =>  show(MODAL, {
      title: 'Детали примерки',
      Content: () => <DetailsModalContent item={ rest } {...rest} />,
      actionText: 'Закрыть'
    })
  })
)(PlanItem)