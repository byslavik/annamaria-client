import React from 'react'
import DetailsReservContent from './DetailsReservContent'
import { AddReserv } from '../'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { MODAL } from '../../constant'

export default compose(
  connect(null, { show }),
  withHandlers({
    editItem: ({ show, item }) => () =>
      show(MODAL, {
        title: 'Изменить данные Брони',
        Content: () => <AddReserv update initialItem={ item } actionText="Обновить" />
      })
  })
)(DetailsReservContent)