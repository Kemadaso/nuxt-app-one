
const bcrypt = require('bcrypt')
const saltRounds = 10


exports.encrypt = async function (textpassword) {
    return await bcrypt.hash(textpassword, saltRounds)
}

exports.decrypt = async function (textpassword, hash) {
    return await bcrypt.compare(textpassword, hash)
}


exports.inArray = function(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

exports.isObjectEmpty = function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

exports.isArrayEmpty = function(arr) {
    if (Array.isArray(arr) && arr.length) {
        return false
    } else {
        return true
    }
}

exports.isObjectNoEmpty = function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return true
    }

    return false
}

exports.isArrayNoEmpty = function(arr) {
    if (Array.isArray(arr) && arr.length) {
        return true
    } else {
        return false
    }
}


exports.sanitizeWhereQuery = function (str) {
    if(typeof str === 'string') {
        str = str.replace(/([^a-z0-9áéíóúñü_-\s\=\"\%\.,]|[\t\n\f\r\v\0])/gim,"")
        str = str.replace(/,/gi, ' ')
        str = str.replace(/"/gi, "'")
        return str.trim()
    } else {
        return ''
    }
        
}

exports.sanitizeString = function (str) {
    if(typeof str === 'string') {
        str = str.replace(/([^a-z0-9áéíóúñü_-\s\.,]|[\t\n\f\r\v\0])/gim,"");
        return str.trim()
    } else {
        return ''
    }

}

exports.slugify = function (text) {
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
    const to = "aaaaaeeeeeiiiiooooouuuunc------"
  
    const newText = text.split('').map(
      (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))
  
    return newText
      .toString()                     // Cast to string
      .toLowerCase()                  // Convert the string to lowercase letters
      .trim()                         // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-')             // Replace & with '-'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}


exports.parseNumeric = function(val) {
    let num = parseInt(val)
    //if(num !== NaN) return num 
}

exports.parseString = function(val) {
    if(typeof val === 'string') return val.toString() 
}

exports.validURL = function(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}


exports.serverName = function(value) {

    //filtramos si es iframe y obtenemos el src
    let t = null
    if(t = value.match(/<iframe[^>]*src=[\"|']([^'\"]+)[\"|'][^>]*>/i)) {
      value = t[1]
    }
  
    //creamos un array de cadena por cada linea
    let print = value.match(/[^\r\n]+/gm)
  
    //quitamos los espacios en blanco
    print = print.filter(line => {
        if(line.trim() !== '') {
            return true
        } else {
            return false
        }
    })
  
    //validamos si es una url y devolvemos el hostname
    if(exports.validURL(print[0])) {
      let url = new URL(print[0])
      return {
        hostname: url.hostname, 
        favicon: `https://www.google.com/s2/favicons?domain=${url.hostname}`
      }
    }
  
    return {}
  
  }