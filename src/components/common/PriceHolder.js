import React from 'react'

const PriceHolder = ({ prise, prepaid, zalog }) =>
  <>
    { prise ? <><b>Сумма</b>: { prise } <br/></> : ''}
    { prepaid ? <><b>Предоплата</b>: { prepaid } <br/></> : ''}
    { zalog ? <><b>Залог</b>: { zalog } <br/></> : ''}
    { prise && prepaid ? <><b>Остаток</b>: { prise - prepaid } <br/></> : ''}
  </>

export default PriceHolder
