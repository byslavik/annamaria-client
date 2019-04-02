import React from 'react'
import styled, { css } from 'styled-components'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Media } from '../'

const TableComponent = ({
  openCreateModal,
  openDetailsModal,
  date,
  items = [],
  dblClkHanlder,
  enableRow,
  onTimeFieldChage,
  onTimeFieldBlur,
  timeValue,
  hightlightVidacha,
  mobileCols = 3,
  columns = []
}) =>
<>
  <Media.Desktop>
    <Table>
        <TableHead>
          <TableRow>
            { columns.map(({ label }, index) => <HeadingCell align="left" key={index}>{label}</HeadingCell>) }
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <StyledRow
              key={item._id}
              isVidacha={ hightlightVidacha && item.isVidacha }
              isPlaceholder={ item.placeholder }
              onClick={ () => item.placeholder ? openCreateModal(item, true) : openDetailsModal(item) }>
              {
                columns
                  .map(({ field, label, renderFn }) =>
                    <TableCell align="left" key={`${item._id}-${label}`}>
                      {
                        renderFn ? renderFn(item) : item[field]
                      }
                    </TableCell>)
              }
              </StyledRow>
          ))}
          {
            items.length === 0 &&
              <TableRow key='empty-row'>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="overline" gutterBottom>
                    Данных не найдено
                  </Typography>
                </TableCell>
              </TableRow>
          }
          {
            enableRow &&
              <TableRow key='extra-row'>
                <TableCell colSpan={columns.length} align="left">
                  <TextField
                    id="time"
                    name="time"
                    type="time"
                    value={ timeValue }
                    onChange={ onTimeFieldChage }
                    onBlur={ onTimeFieldBlur }
                  />
                </TableCell>
              </TableRow>
          }
          <TableRow key='last-row' onDoubleClick={ dblClkHanlder }>
              <TableCell component="th" scope="row" />
              <TableCell align="right" />
              <TableCell align="right" />
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
        </TableBody>
      </Table>
  </Media.Desktop>
  <Media.Mobile>
    <Table>
    
      {items.map(item => (
        <StyledRow
          key={item._id}
          isVidacha={ hightlightVidacha && item.isVidacha }
          isPlaceholder={ item.placeholder }
          onClick={ () => item.placeholder ? openCreateModal(item, true) : openDetailsModal(item) }>
          {
            [...columns]
              .splice(0, mobileCols)
              .map(({ field, label, renderFn }) =>
                <StyledCell align="left" key={`${item._id}-${label}`}>
                  {
                    renderFn ? renderFn(item) : item[field]
                  }
                </StyledCell>)
          }
          </StyledRow>
      ))}
      
      </Table>
  </Media.Mobile>
</>

export default TableComponent

const StyledRow = styled(TableRow)`
  ${props => props.isPlaceholder && css`
     background-color: rgba(0, 245, 87, 0.08);
  `}
`

const StyledCell = styled(TableCell)`
  width: ${props => props.width || 30}%;

  && {
    ${Media.mobile`
      padding: 15px 10px;

      & + & {
        padding-left: 10px;
      }
    `}
  }
`

const HeadingCell = styled(TableCell)`
  && {
    font-size: 17px;
    font-weight: bold;
  }
`