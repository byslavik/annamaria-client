import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import dateFormatter from '../../helpers/date-formatter'
import Media from '../Media'
import { DressList } from '../../components/common'

const DetailsModalContent = ({
  dressIds,
  clientPhone,
  clientName,
  primerkaDate,
  primerkaDateStr,
  eventDate,
  eventDateStr, 
  isVidacha,
  comments,
  editItem,
  reservItem,
  isPrimerkaDone
}) =>
  <MuiDialogContent>
    <Column>
        <Row>
          <Column>
            <Row>
              <BoldText>Дата примерки: </BoldText>
              <Typography>{ dateFormatter(primerkaDate) }</Typography>
            </Row>
            <Row>
              <BoldText>Клиент: </BoldText>
              <Typography>{ clientName } <b>{ clientPhone }</b></Typography>
            </Row>
            <Row>
              <BoldText>Дата съемки/мероприятия: </BoldText>
              <Typography>{ eventDate && eventDate.date ? dateFormatter(eventDate) : 'не определено' }</Typography>
            </Row>
            <Row>
              <BoldText>Номера платьев: </BoldText>
              <Typography><DressList items={ dressIds } /></Typography>
            </Row>
            <Row>
              <BoldText>Возьмут: </BoldText>
              <Typography>{ isVidacha ? 'Да' : 'Нет'}</Typography>
            </Row>
          </Column>
        </Row>
        {
          comments &&
            <Column>
              <BoldText>Комментарии: </BoldText>
              <Typography paragraph dangerouslySetInnerHTML={ { __html: comments.replace(/(?:\r\n|\r|\n)/g, '<br/>') } } />
            </Column>
        }
        <MuiDialogActions>
          { 
            isPrimerkaDone ?
              <p>Примерка прошла</p> :
              <>
                <Button onClick={ reservItem } type="button" color="secondary">
                  Бронировать
                </Button>
              </>
          }

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

  ${Media.mobile`
    min-width: auto;
  `}

  & + & {
    margin-left: 10px;

    ${Media.mobile`
      margin: 0;
    `}
  }

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
