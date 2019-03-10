const addZero = value => Number(value) >= 10 ? value : `0${value}`

const dateFormatter = date => {
  const currentDate = new Date(date)

  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  return `${year}-${addZero(month)}-${addZero(day)}`
}

export default dateFormatter
