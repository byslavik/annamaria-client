const getToken = cook => {
  if (cook) {
    var parted = cook.split(' ');
    if (parted.length === 2 && parted[0] === 'JWT') {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
};

export default getToken
