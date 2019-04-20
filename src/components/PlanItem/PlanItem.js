import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import styled, { css } from 'styled-components'
import Chip from '@material-ui/core/Chip';
import dateFormatter from '../../helpers/date-formatter'
import { DressList, PriceHolder } from '../../components/common'
import { Media } from '../../components'
import { CallMade, CallReceived } from '@material-ui/icons'

const PlanItem = ({
  clientName,
  clientPhone,
  dressIds,
  itemTypes,
  type,
  openDetailsReservModal,
  openDetailsModal,
  eventDate,
  prise,
  prepaid,
  zalog,
  comments,
  isPrimerkaDone,
  isVidacha,
  isVidachaDone,
  isReturnDone
}) =>
  <StyledPaper elevation={1}>
    <Heading variant="h5" component="h3">
      { clientName }
      <StyledIconButton>
        { isVidachaDone && <CallMade title="Примерка прошла"  /> }
        { isReturnDone && <CallReceived title="С выдачей"/> }
        <IconButton onClick={ isPrimerkaDone ? openDetailsReservModal : openDetailsModal }>
          <StyledInfoIcon />
        </IconButton>
      </StyledIconButton>
    </Heading>
    <StyledTypo component="p">
      { clientPhone }
    </StyledTypo>
      { dressIds.length > 0 && <StyledTypo component="p"><DressList items={ dressIds } /></StyledTypo> }
    {
      eventDate &&
        <StyledTypo component="p">
          Съемка: { dateFormatter(eventDate.date) } { eventDate.time }
        </StyledTypo>
    }
    {
      (prise || prepaid || zalog) &&
      <StyledTypo>
        <PriceHolder prise={ prise } prepaid={ prepaid } zalog={ zalog } />
      </StyledTypo>
    }
    {
      comments &&
        <StyledTypo italic dangerouslySetInnerHTML={{ __html: comments }} />
    }
    {
      console.log(itemTypes)
    }
    {
      isVidacha &&
      !isVidachaDone &&
      !isReturnDone &&
      !itemTypes.some(({ label }) => label === 'Возврат' || label === 'Выдача') &&
        <StyledTypo isVidacha>  
          <b>Возьмут</b>
        </StyledTypo>
    }
    <StyledTypo component="p">
      {
        itemTypes.map((item, index) => <StyledChip key={ index } { ...item } label={ [item.label, item.time].join(' ') } />)
      }
    </StyledTypo>
  </StyledPaper>

export default PlanItem

const StyledChip = styled(Chip)`
  && {
    background: ${props => props.color};
    margin-bottom: 5px;
  }

  & + & {
    margin-left: 10px;
  }
`

const StyledInfoIcon = styled(InfoIcon)`
  @media print {
    display: none !important;
  }
`

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-width: 300px;
  width: calc(33% - 60px);
  margin: 10px;
  display: flex;
  flex-direction: column;

  ${Media.mobile`
    width: 100%
    min-width: auto;
    min-width: auto;
  `}

  @media print {
    display: block;
    float: left !important;
    width: 27%;
    margin: 0;
  }
`

const StyledTypo = styled(Typography)`
  && {
    margin: 10px 0;

    ${props => props.italic && css`
      font-style: italic
    `}

    ${props => props.isVidacha && css`
      background: rgba(245, 0, 87, 0.48);
      display: inline-block;
      padding: 3px;
      border-radius: 1px;
      text-align: center;
    `}
  }


`

const Heading = styled(Typography)`
  && {
    padding-right: 48px;
    position: relative;
    margin: 10px 0;
  }
`

const StyledIconButton = styled.div`
  && {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -9px;
  }
`
