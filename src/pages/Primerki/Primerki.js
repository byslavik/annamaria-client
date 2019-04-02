import React from 'react'
import Paper from '@material-ui/core/Paper';
import { TopBar, Table } from '../../components'
import { Button } from '@material-ui/core';

const Primerki = ({
  openCreateModal,
  date,
  ...props
}) =>
    <Paper>
      <TopBar
        date={ date }
        describeText="Показаны примерки на">
        <Button onClick={ openCreateModal } color="primary">Добавить примерку</Button>
      </TopBar>
      <Table hightlightVidacha openCreateModal={ openCreateModal } { ...props } />
    </Paper>


export default Primerki
