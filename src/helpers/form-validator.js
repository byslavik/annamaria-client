const validate = values => {
  const errors = {}

  console.log(values)
  
  Object.keys(values).forEach(item => values[item].trim() === '' && (errors[item] = 'Это поле не может быть пустым'))
console.log(errors)
  return errors
}

export default validate