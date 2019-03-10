import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import dateFormatter from '../../helpers/date-formatter'
import Button from '@material-ui/core/Button';
import { DateSelector, Media } from '../'

const TopBar = ({ date, actionBtnText, describeText, action }) =>
  <Bar>
    <Media.Desktop>
      <DateSelector />
      <Typography variant="overline" gutterBottom>
        { describeText }: { dateFormatter(date, true) }
      </Typography>
      <ButtonWrapper>
        <Button color="secondary" onClick={ () => window.print() }>Печать</Button>
        <Button onClick={ action } color="primary">{ actionBtnText }</Button>
      </ButtonWrapper>
    </Media.Desktop>
    <Media.Mobile>
      <Wrapper>
        <DateSelector />  
        <ButtonWrapper>
          <Button color="secondary" onClick={ () => window.print() }>Печать</Button>
          <Button onClick={ action } color="primary">{ actionBtnText }</Button>
        </ButtonWrapper>
      </Wrapper>
      <Typography variant="overline" gutterBottom>
        { describeText }: { dateFormatter(date, true) }
      </Typography>
    </Media.Mobile>
  </Bar>

export default TopBar

const Bar = styled.div`
  display: flex;
  padding: 10px 25px;
  align-items: center;
  justify-content: space-between;

  ${Media.mobile`
    flex-direction: column;
  `}
`

const Wrapper = styled.div`
  display: flex;
`

const ButtonWrapper = styled.div`
  display: flex;

  @media print {
    display: none;
  }
`