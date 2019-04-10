import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

const LoadingWrapaper = ({ isFetching, children }) =>
  <Wrapper isFetching={ isFetching }>
    { children }
    { isFetching && <Overlay /> }
  </Wrapper>

const mapStateToProps = ({ app: { isFetching }}) => ({ isFetching })

export default compose(
  connect(mapStateToProps)
)(LoadingWrapaper)

const Wrapper = styled.div`
  ${props => props.isFetching && css`
    position: relative;
  `}
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, .5);
`