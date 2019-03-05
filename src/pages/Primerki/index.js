import React from 'react'
import Primerki from './Primerki'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { show } from 'redux-modal'
import { MODAL } from '../../constant'
import { AddPrimerka, DetailsModalContent } from '../../components'

export default compose(
  connect(null, { show }),
  withHandlers({
    openCreateModal: ({ show }) => () => show(MODAL, {
      title: 'Добавить примерку',
      Content: AddPrimerka,
      actionText: 'Добавить'
    }),
    openDetailsModal: ({ show }) => item =>  show(MODAL, {
      title: 'Детали примерки',
      Content: () => <DetailsModalContent {...item} />,
      actionText: 'Закрыть'
    }),
    
  })
)(Primerki)