import React from 'react'
import DetailsModalContent from './DetailsModalContent'
import { AddPrimerka, AddReserv } from '../'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { MODAL } from '../../constant'

export default compose(
  connect(null, { show }),
  withHandlers({
    editItem: ({ show, item }) => () =>
      show(MODAL, {
        title: 'Изменить данные о примерке',
        Content: () => console.log(item) || <AddPrimerka update initialItem={ item } actionText="Обновить" />
      }),
    reservItem: ({ show, item }) => () =>
      show(MODAL, {
        title: 'Бронировать',
        Content: () => <AddReserv convert initialItem={ item } actionText="Бронировать" />
      })
  })
)(DetailsModalContent)