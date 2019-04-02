import {
  TYPE,
  PRIMERKA,
  RESERV
} from '../constant'

const prepareItem = (formValues, isPrimerka = true) => {
  console.log(formValues)
  const values = {
    ...formValues,
    placeholder: false,
    [TYPE]: isPrimerka ? PRIMERKA : RESERV,
  }

  return values
}

export default prepareItem