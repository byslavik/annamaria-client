
const validator = str => {
  if (typeof str === 'string') {
    return str.trim() !== ''
  }

  if (typeof str === 'number') {
    return str >= 0
  }

  return Boolean(str)
}

const validate = fieldsToValidate => values => {
  const errors = {}

  fieldsToValidate.forEach(item => !validator(values[item]) && (errors[item] = 'Это поле не может быть пустым'))

  return errors
}

export default validate