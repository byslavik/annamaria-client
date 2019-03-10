import {
  DRESS_IDS,
  TYPE,
  PRIMERKA,
  RESERV
} from '../constant'

const prepareItem = (formValues, isPrimerka = true) => {
  const values = {
    ...formValues,
    placeholder: false,
    [TYPE]: isPrimerka ? PRIMERKA : RESERV,
    [DRESS_IDS]: formValues[DRESS_IDS].split(',').map(item => item.trim())
  }

  return values
}

export default prepareItem