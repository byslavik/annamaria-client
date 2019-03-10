import { css } from 'styled-components'
import { MOBILE_EDGE } from '../../constant'

export const desktop = (...args) => css`
  @media (min-width: ${MOBILE_EDGE + 1}px) {
    ${css(...args)}
  }
`

export const mobile = (...args) => css`
  @media (max-width: ${MOBILE_EDGE}px) {
    ${css(...args)}
  }
`
