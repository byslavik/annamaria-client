import React from 'react'
import styled from 'styled-components'
import { TopBar, PlanItem, Table, CommentWindow, Media } from '../../components'
import { LoadingWrapper } from '../../components/common'
import { Button, Typography } from '@material-ui/core';

const Plan = ({
  items,
  date,
  openCreateModal,
  openCreateReservModal,
  ...props
}) =>
  <>
    <TopBar
      date={ date }
      describeText="Показан план день">
        <Button onClick={ openCreateModal } color="primary">Добавить примерку</Button>
        <Button onClick={ openCreateReservModal } color="primary">Добавить бронь</Button>
        <CommentWindow />
    </TopBar>
    <Media.Desktop>
      <LoadingWrapper>
        <Table mobileCols={ 4 } hightlightVidacha items={ items }  { ...props } openCreateModal={ () => {} } openDetailsModal={ () => {} } />
      </LoadingWrapper>
    </Media.Desktop>

    <Media.Mobile>
      <Wrapper>
        <LoadingWrapper>
          <ItemsWrapper>
          { items.map((item, index) => <PlanItem currentDate={ date } key={index} {...item} />) }
          </ItemsWrapper>
        </LoadingWrapper>
      </Wrapper>
      { items.length === 0 &&
          <StyledTypography variant="overline" gutterBottom>
            Данных не найдено
          </StyledTypography>
      }
    </Media.Mobile>
  </>
  
export default Plan

const Wrapper = styled.div`
`

const StyledTypography = styled(Typography)`
  text-align: center;
`
const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${Media.mobile`
    width: 100%;
  `}

  @media print {
    display: block;
  }
`