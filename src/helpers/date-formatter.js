const MONTHS = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

const dateFormatter = date => {
  const currentDate = new Date(date)

  const day = currentDate.getDate()
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const hours = currentDate.getHours()
  const mins = currentDate.getMinutes()

  return `${day} ${MONTHS[month]} ${year} ${hours}:${mins}`
}

export default dateFormatter
