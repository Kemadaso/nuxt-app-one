let mysql = require('mysql2')

let connection = mysql.createPool({
    host: 'localhost',
    user: 'dev001',
    password: 'unnamed001',
    database: 'exampledb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})


connection.on('connection', function(conn) {
    console.log('DB connection established')
})

connection.on('error', function(err) {
    console.log('DB connection error: ', err.code)
})

connection.on('close', function(err) {
    console.log('DB connection close: ', err.code)
})

module.exports = connection