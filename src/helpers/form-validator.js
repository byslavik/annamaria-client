
const validate = fieldsToValidate => values => {
  const errors = {}
  console.log(values)
  fieldsToValidate.forEach(item => !values[item] && (errors[item] = 'Это поле не может быть пустым'))

  return errors
}

export default validate