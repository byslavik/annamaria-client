import React from 'react'
import Paper from '@material-ui/core/Paper';
import { TopBar, Table } from '../../components'

const Vidacha = ({
  openCreateModal,
  date,
  ...props
}) =>
    <Paper>
      <TopBar
        action={ openCreateModal }
        date={ date }
        describeText="Показаны брони на"
        actionBtnText="Добавить бронь" />
      <Table timeField="reservDate" { ...props } />      
    </Paper>


export default Vidacha
