import React from 'react'
import Plan from './Plan'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers, lifecycle } from 'recompose'
import { show } from 'redux-modal'
import { MODAL, PLAN, PRIMERKA_DATE, RESERV_DATE, RETURN_DATE } from '../../constant'
import { AddPrimerka, AddReserv } from '../../components'
import { setCurrentPage, getItems } from '../../actions' 


const getItemTypes = ({
  primerkaDate = {},
  reservDate = {},
  returnDate = {},
  date: currentDate
}) => {
  const values = {
    [PRIMERKA_DATE]: primerkaDate,
    [RESERV_DATE]: reservDate,
    [RETURN_DATE]: returnDate
  }

  return Object
    .keys(values)
    .filter(key => values[key].date === currentDate)
}

const mapStateToProps = ({
  date,
  app: {
    items
  }
}) => ({ date, items })

export default compose(
  connect(mapStateToProps, { show, setCurrentPage, getItems }),
  withHandlers({
    openCreateModal: ({ show }) => () => show(MODAL, {
      title: 'Добавить примерку',
      Content: () => <AddPrimerka update={ false } />,
      actionText: 'Добавить',
    }),
    openCreateReservModal: ({ show }) => () => show(MODAL, {
      title: 'Добавить Бронь',
      Content: () => <AddReserv  update={ false } />,
      actionText: 'Добавить',
    })
  }),
  withProps(({ items, date }) => ({
    items: items
      .filter(({ placeholder }) => !placeholder)
      .sort((item, nextItem) => {
        const currentItemTypes = getItemTypes({ ...item, date })
        const nextItemTypes = getItemTypes({ ...nextItem, date })
        const curDateParsed = Date.parse(item[`${currentItemTypes[0]}Str`])
        const nextDateParsed = Date.parse(nextItem[`${nextItemTypes[0]}Str`])
        
        if( curDateParsed > nextDateParsed) {
          return 1
        } else if(curDateParsed < nextDateParsed) {
          return -1
        }

        return 0
      })
  })),
  lifecycle({
    componentDidMount() {
      const { setCurrentPage, getItems, date } = this.props
      
      setCurrentPage(PLAN)
      getItems({ type: PLAN, date })
    }
  })
)(Plan)