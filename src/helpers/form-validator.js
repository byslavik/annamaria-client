
const validate = fieldsToValidate => values => {
  const errors = {}
  
  fieldsToValidate.forEach(item => !values[item] && (errors[item] = 'Это поле не может быть пустым'))

  return errors
}

export default validate