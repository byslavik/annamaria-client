export const MODAL = 'MODAL'
export const CLIENT_NAME = 'clientName'
export const CLIENT_PHONE = 'clientPhone'
export const DRESS_IDS = 'dressIds'
export const PRIMERKA_DATE = 'primerkaDate'
export const IS_VIDACHA = 'isVidacha'
export const IS_PRIMERKA_DONE = 'isPrimerkaDone'
export const IS_VIDACHA_DONE = 'isVidachaDone'
export const IS_RETURN_DONE = 'isReturnDone'
export const EVENT_DATE = 'eventDate'
export const RETURN_DATE = 'returnDate'
export const RESERV_DATE = 'reservDate'
export const COMMENTS = 'comments'
export const PRISE = 'prise'
export const PREPAID = 'prepaid'
export const ZALOG = 'zalog'
export const TYPE = 'type'
export const PRIMERKA = 0
export const RESERV = 1
export const PLAN = -1

export const MOBILE_EDGE = 980

export const TYPE_MAP = {
  [RESERV_DATE]: {
    label: 'Выдача',
    color: 'rgba(0, 245, 87, 0.48)'
  },
  [RETURN_DATE]: {
    label: 'Возврат',
    color: 'rgba(0,87,245,0.48)'
  },
  [PRIMERKA_DATE]: {
    label: 'Примерка',
    color: 'rgba(245, 0, 87, 0.48)'
  },
}