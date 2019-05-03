const prepareItem = formValues => {
  const values = {
    ...formValues,
    placeholder: false
  }

  return values
}

export default prepareItem