import {
  TYPE,
  PRIMERKA,
  RESERV
} from '../constant'

const prepareItem = formValues => {
  console.log(formValues)
  const values = {
    ...formValues,
    placeholder: false
  }

  return values
}

export default prepareItem