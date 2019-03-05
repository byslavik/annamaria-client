const getCook = cookiename => {
  var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

export default getCook 
