import React from 'react'
import Paper from '@material-ui/core/Paper';
import { TopBar, Table } from '../../components'
import { LoadingWrapper } from '../../components/common'

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
      <LoadingWrapper>
        <Table timeField="reservDate" openCreateModal={ openCreateModal } { ...props } />  
      </LoadingWrapper>
    </Paper>


export default Vidacha
