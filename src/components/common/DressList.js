import React from 'react'
import styled, { css } from 'styled-components'

const DressList = ({ items, searchIds = [] }) => items
  .map(({id, size}, index) =>
    <Item hightLight={ searchIds.includes(id) } key={index}>{id}{size && `, p-p ${size}`}; </Item>)

export default DressList

const Item = styled.span`
  padding: 3px 5px;
  ${
    props => props.hightLight && css`
      background: rgba(87,0,245,0.08);
    `
  }
`