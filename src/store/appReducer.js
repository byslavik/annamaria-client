import getCook from '../helpers/get-cook'
import getToken from '../helpers/get-token'

const auth = getCook('auth')

const initialState = {
  isLogged: getToken(auth),
}

export const app = (state = initialState, { type, payload }) => {
 switch (type) {
    default: {   
      return state;
    }
  }
}