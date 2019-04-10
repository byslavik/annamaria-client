import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { updateDressList, dropDressList } from '../../actions'

const DressList = ({ items, searchIds = [], highlisghtYellow, dressList }) => items
  .map(({id, size}, index) =>
    <Item highlisghtYellow={ highlisghtYellow && dressList[id] > 1 } hightLight={ searchIds.includes(id) } key={index}>{id}{size && `, p-p ${size}`}; </Item>)

const mapStateToProps = ({ app: { dressList }}) => ({ dressList })

export default compose(
  connect(mapStateToProps, { updateDressList, dropDressList }),
  lifecycle({
    componentDidMount() {
      this.props.updateDressList(this.props.items)
    },
    componentWillUnMount() {
      this.props.dropDressList()
    }
  })
)(DressList)

const Item = styled.span`
  padding: 3px 5px;
  ${
    props => props.hightLight && css`
      background: rgba(87,0,245,0.08);
    `
  }
  ${
    props => props.highlisghtYellow && css`
      background: yellow;
    `
  }
`