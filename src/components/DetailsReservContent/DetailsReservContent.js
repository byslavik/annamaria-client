import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Media from '../Media'
import dateFormatter from '../../helpers/date-formatter'
import { DressList } from '../../components/common'

const DetailsModalContent = ({
  dressIds,
  clientPhone,
  clientName,
  primerkaDate,
  reservDate,
  eventDate,
  prise,
  prepaid,
  zalog,
  comments,
  editItem,
  returnDate
}) =>
  <MuiDialogContent>
    <Column>
        <Row>
          <Column>
            {
              primerkaDate &&
                <Row>
                  <BoldText>Дата примерки: </BoldText>
                  <Typography>{ dateFormatter(primerkaDate) }</Typography>
                </Row>
            }
            <Row>
              <BoldText>Дата выдачи: </BoldText>
              <Typography>{ dateFormatter(reservDate) }</Typography>
            </Row>
            <Row>
              <BoldText>Дата возврата: </BoldText>
              <Typography>{ dateFormatter(returnDate) }</Typography>
            </Row>
            <Row>
              <BoldText>Клиент: </BoldText>
              <Typography>{ clientName } <b>{ clientPhone }</b></Typography>
            </Row>
            <Row>
              <BoldText>Дата съемки/мероприятия: </BoldText>
              <Typography>{ dateFormatter(eventDate) }</Typography>
            </Row>
            <Row>
              <BoldText>Номера платьев: </BoldText>
              <Typography><DressList items={ dressIds } /></Typography>
            </Row>
            <Row>
              <BoldText>Стоимость: </BoldText>
              <Typography>{ prise }</Typography>
            </Row>
            <Row>
              <BoldText>Предоплата: </BoldText>
              <Typography>{ prepaid }</Typography>
            </Row>
            <Row>
              <BoldText>Залог: </BoldText>
              <Typography>{ zalog }</Typography>
            </Row>
          </Column>
        </Row>
        {
          comments &&
            <Row>
              <BoldText>Комментарии: </BoldText>
              <Typography paragraph dangerouslySetInnerHTML={ { __html: comments.replace(/(?:\r\n|\r|\n)/g, '<br/>') } } />
            </Row>
        }
        <MuiDialogActions>
          <Button onClick={ editItem } type="button" color="primary">
            Редактировать
          </Button>
        </MuiDialogActions>
    </Column>
  </MuiDialogContent>

export default DetailsModalContent

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;

  & + & {
    margin-left: 10px;
  }

  ${Media.mobile`
    min-width: auto;
  `}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;

  ${Media.mobile`
    flex-direction: column;
    margin-bottom: 10px;
  `}
`

const BoldText = styled(Typography)`
  && {
    font-weight: bold;
    margin-right: 5px;
  }
`
