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

const addZero = value => Number(value) >= 10 ? value : `0${value}`

const dateFormatter = (date, skipTime = false) => {
  const currentDate = new Date(date)

  const day = currentDate.getDate()
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const hours = currentDate.getHours()
  const mins = currentDate.getMinutes()

  return `${day} ${MONTHS[month]} ${year}${!skipTime ? ` ${addZero(hours)}:${addZero(mins)}` : ''}`
}

export default dateFormatter
