import React from 'react'
import withDevice from './withDevice'

const Desktop = ({ desktop, children }) =>
  desktop &&
    <>
      { children }
    </>

export default withDevice(Desktop)