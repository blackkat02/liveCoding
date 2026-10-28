/**
 * Play with URLs
 * @param {string} url - The URL that's we want to manipulate
 * @param {string} param - The parameter that we want to change or add
 * @returns {string} The result URL.
 */
function addOrChangeUrlParameter (url, param) {
  console.log(url, param)
  const arr = url.split("?")
  const res = [arr[0]]
  // console.log(arr, arr.length)
  let flag = false
  
  if (!param) { 
    return url 
  } else if (arr.length === 1) { 
    return url.concat("?", param) 
  };
  
//   const [urlKey, urlValue] = arr[1].split("=")
//   console.log(urlKey, urlValue)
  const [paramKey, paramValue] = param.split("=")
  // console.log(paramKey, paramValue)
  
  for (const urlKeyValue of arr.slice(1)) {
    console.log(urlKeyValue)
    const [urlKey, urlValue] = urlKeyValue.split("=")
    
    if (urlKey === paramKey) {
      res.push("?", urlKey, "=", paramValue)
      flag = true
    } else { 
      res.push("?", urlKey, "=", urlValue)
    }
//     console.log(res.join(""))
//     console.log(res.push("?", param).join(""))
    if (flag) {
      return res.join("")
    } else {
      res.push("?", param)
      return res.join("")
    }
    
    return flag = true ? res.join("") : res.push("?", param).join("")
  }
}


console.log(addOrChangeUrlParameter("www.example.com", "key=value"))

console.log(addOrChangeUrlParameter("www.example.com?key=value", "key2=value2" ))
// -> 'www.example.com?key=value&key2=value2' (adds another parameter).

console.log(addOrChangeUrlParameter("www.example.com?key=oldValue`", "key=newValue" ))
// ->'www.example.com?key=newValue' (changes the parameter).