/**
 * Play with URLs
 * @param {string} url - The URL that's we want to manipulate
 * @param {string} param - The parameter that we want to change or add
 * @returns {string} The result URL.
 */
function addOrChangeUrlParameter (url, param) {
  if (param === "key") { return url }
  
  return url.concat("?", param)
}

console.log(addOrChangeUrlParameter("www.example.com", "key=value"))

console.log(addOrChangeUrlParameter("www.example.com?key=value", "key2=value2" ))
// -> 'www.example.com?key=value&key2=value2' (adds another parameter).

console.log(addOrChangeUrlParameter("www.example.com?key=oldValue`", "key=newValue" ))
// ->'www.example.com?key=newValue' (changes the parameter).