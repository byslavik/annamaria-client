import React from 'react'
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import dateFormatter from '../../helpers/date-formatter'


const item =
  {
    dressIds: [72, 74, 78],
    clientPhone: '+375291234567',
    clientName: 'Васелиса Пупкина',
    primerkaDate: new Date(),
    eventDate: new Date(),
    isVidacha: true,
    comments: 'lorem ipsum dolor sit amet'
  }

let id = 0;
function createData(time, clientName, ids, dressingdate, comment) {
  id += 1;
  return { id, time, clientName, ids, dressingdate, comment };
}

const rows = [
  createData('9:00', 'Васелиса Пупкина, +375291234567', [72, 74, 78], new Date(), 'lorem ipsum dolor sit amet'),
  createData('10:00', 'Васелиса Пупкина, +375291234567', [72, 74, 78], new Date(), 'lorem ipsum dolor sit amet'),
  createData('11:00', 'Васелиса Пупкина, +375291234567', [72, 74, 78], new Date(), 'lorem ipsum dolor sit amet'),
  createData('12:00', 'Васелиса Пупкина, +375291234567', [72, 74, 78], new Date(), 'lorem ipsum dolor sit amet'),
  createData('13:00', 'Васелиса Пупкина, +375291234567', [72, 74, 78], new Date(), 'lorem ipsum dolor sit amet'),
];

const Primerki = ({
  openCreateModal,
  openDetailsModal
}) =>
    <Paper>
      <Bar>
        <TextField
          id="datetime-local"
          label="Дата примерки"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="overline" gutterBottom>
          Показаны примерки на дату: 
        </Typography>
        <ButtonWrapper>
          <Button color="secondary">Печать</Button>
          <Button onClick={ openCreateModal } color="primary">Добавить примерку</Button>
        </ButtonWrapper>
      </Bar>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Время</TableCell>
            <TableCell align="right">Клиент</TableCell>
            <TableCell align="right">Наименование</TableCell>
            <TableCell align="right">Дата съемки/Мероприятия</TableCell>
            <TableCell align="right">Комментарии</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} onClick={ () => openDetailsModal(item) }>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.clientName}</TableCell>
              <TableCell align="right">{row.ids.join(', ')}</TableCell>
              <TableCell align="right">{dateFormatter(row.dressingdate)}</TableCell>
              <TableCell align="right">{row.comment}</TableCell>
            </TableRow>
          ))}
          <TableRow key='last-row'>
              <TableCell component="th" scope="row" />
              <TableCell align="right" />
              <TableCell align="right" />
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
        </TableBody>
      </Table>
    </Paper>


export default Primerki

const Bar = styled.div`
  display: flex;
  padding: 10px 25px;
  align-items: center;

  justify-content: space-between;
`

const ButtonWrapper = styled.div`
  display: flex;
`