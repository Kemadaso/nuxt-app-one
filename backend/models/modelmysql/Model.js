const mysql = require('mysql2/promise')


const a = (async function () {
  
  try {
    let aea = await mysql.createConnection({
      host: 'localhost',
      user: 'dev001',
      password: 'unnamed001',
      database: 'exampledb'
    })
    
    //console.log(aea)

    return aea
    
  } catch (error) {
    console.log(error)
  }
  
})()





module.exports = a