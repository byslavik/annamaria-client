import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import dateFormatter from '../../helpers/date-formatter'
import Button from '@material-ui/core/Button';
import { DateSelector, Media } from '../'

const TopBar = ({ date, children, describeText }) =>
  <Bar>
    <Media.Desktop>
      <DateSelector />
      <Typography variant="overline" gutterBottom>
        { describeText }: { dateFormatter(date, true) }
      </Typography>
      <ButtonWrapper>
        <Button color="secondary" onClick={ () => window.print() }>Печать</Button>
        { children }
      </ButtonWrapper>
    </Media.Desktop>
    <Media.Mobile>
      <Wrapper>
        <DateSelector />  
        <ButtonWrapper>
          <Button color="secondary" onClick={ () => window.print() }>Печать</Button>
          { children }
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
  border-bottom: 3px solid #404fb9;

  ${Media.mobile`
    flex-direction: column;
  `}
`

const Wrapper = styled.div`
  display: flex;

  ${Media.mobile`
    flex-direction: column;
  `}
`

const ButtonWrapper = styled.div`
  display: flex;

  ${Media.mobile`
    flex-direction: column;
  `}

  @media print {
    display: none;
  }
`