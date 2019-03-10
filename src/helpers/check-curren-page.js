const VIDACHA = '/vidachi'
const PRIMERKI = '/'

const checkCurrentPage = () => {
  switch(window.location.pathname) {
    case PRIMERKI: {
      return 0
    }
    case VIDACHA: {
      return 1
    }
    default: {
      return 0
    }
  }
}

export default checkCurrentPage