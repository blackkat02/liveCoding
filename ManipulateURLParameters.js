/**
 * Play with URLs
 * @param {string} url - The URL that's we want to manipulate
 * @param {string} param - The parameter that we want to change or add
 * @returns {string} The result URL.
 */
function addOrChangeUrlParameter (url, param) {
  const arr = url.split("?")
  console.log(arr, arr.length)
  
  if (!param) { 
    return url 
  } else if (arr.length === 1) { 
    return url.concat("?", param) 
  };
  
  const [urlKey, urlValue] = arr[1].split("=")
  console.log(urlKey, urlValue)
  const [paramKey, paramValue] = param.split("=")
  console.log(urlKey, urlValue)

  if (urlKey === paramKey) {
    return arr[0].concat("?", param)
  } else {
    return url.concat("?", param)
  }
}


console.log(addOrChangeUrlParameter("www.example.com", "key=value"))

console.log(addOrChangeUrlParameter("www.example.com?key=value", "key2=value2" ))
// -> 'www.example.com?key=value&key2=value2' (adds another parameter).

console.log(addOrChangeUrlParameter("www.example.com?key=oldValue`", "key=newValue" ))
// ->'www.example.com?key=newValue' (changes the parameter).