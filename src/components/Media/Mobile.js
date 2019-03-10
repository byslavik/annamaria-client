import React from 'react'
import withDevice from './withDevice'

const Mobile = ({ mobile, children }) =>
  mobile &&
    <>
      { children }
    </>

export default withDevice(Mobile)