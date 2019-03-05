import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import dateFormatter from '../../helpers/date-formatter'

const DetailsModalContent = ({
  dressIds,
  clientPhone,
  clientName,
  primerkaDate,
  eventDate,
  isVidacha,
  comments
}) =>
  <Column>
      <Row>
        <Column>
          <Row>
            <BoldText>Имя: </BoldText>
            <Typography>{ clientName }</Typography>
          </Row>
          <Row>
            <BoldText>Телефон: </BoldText>
            <Typography>{ clientPhone }</Typography>
          </Row>
          <Row>
            <BoldText>Номера платьев: </BoldText>
            <Typography>{ dressIds.join(', ') }</Typography>
          </Row>
        </Column>
        <Column>
          <Row>
            <BoldText>Дата примерки: </BoldText>
            <Typography>{ dateFormatter(primerkaDate) }</Typography>
          </Row>
          <Row>
            <BoldText>Дата съемки/мероприятия: </BoldText>
            <Typography>{ dateFormatter(eventDate) }</Typography>
          </Row>
          <Row>
            <BoldText>Выдача: </BoldText>
            <Typography>{ isVidacha ? 'Да' : 'Нет'}</Typography>
          </Row>
        </Column>
      </Row>
      <Row>
        <BoldText>Комментарии: </BoldText>
        <Typography paragraph>{ comments }</Typography>
      </Row>
  </Column>

export default DetailsModalContent

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;

  & + & {
    margin-left: 10px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`

const BoldText = styled(Typography)`
  && {
    font-weight: bold;
    margin-right: 5px;
  }
`
