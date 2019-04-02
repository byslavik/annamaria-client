import React from 'react'
import Paper from '@material-ui/core/Paper';
import { TopBar, Table } from '../../components'
import { Button } from '@material-ui/core';

const Vidacha = ({
  openCreateModal,
  date,
  ...props
}) =>
    <Paper>
      <TopBar
        date={ date }
        describeText="Показаны брони на">
        <Button onClick={ openCreateModal } color="primary">Добавить бронь</Button>
      </TopBar>
      <Table timeField="reservDate" openCreateModal={ openCreateModal } { ...props } />  
    </Paper>


export default Vidacha
