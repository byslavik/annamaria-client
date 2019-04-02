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
  if(!date) {
    return
  }
  const datetime = typeof date === 'string' ?
    date :
    Object.values(date).filter(Boolean).join('T')
  const currentDate = new Date(datetime)

  const day = currentDate.getDate()
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const hours = currentDate.getHours()
  const mins = currentDate.getMinutes()

  return `${day} ${MONTHS[month]} ${year}${(skipTime || !date.time) ? '' : ` ${addZero(hours)}:${addZero(mins)}`}`
}

export default dateFormatter
