import React from 'react'
import Paper from '@material-ui/core/Paper';
import { TopBar, Table } from '../../components'

const Primerki = ({
  openCreateModal,
  date,
  ...props
}) =>
    <Paper>
      <TopBar
        action={ openCreateModal }
        date={ date }
        describeText="Показаны примерки на"
        actionBtnText="Добавить примерку" />
      <Table hightlightVidacha { ...props } />
    </Paper>


export default Primerki
