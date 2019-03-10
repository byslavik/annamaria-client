const addZero = value => Number(value) >= 10 ? value : `0${value}`

const getTime = date => {
  const currentDate = new Date(date)

  const hours = addZero(currentDate.getHours())
  const mins = addZero(currentDate.getMinutes())

  return `${hours}:${mins}`
}

export default getTime