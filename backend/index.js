var path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../.env') })

var cluster = require('cluster')
var app = require('./app')


//var root  = path.dirname( __dirname)
var cCPUs = require('os').cpus().length


if(cluster.isMaster) {
  //create a worker for each CPU
  for(var i = 0; i < cCPUs ; i++) {
    cluster.fork()
  }

  cluster.on('online', (worker ) => {
    //console.log( 'Worker ' + worker.process.pid + ' is online.' )
  })

  cluster.on('exit', ( worker, code, signal ) => {
    //console.log( 'worker ' + worker.process.pid + ' died.' )
  })

} else {
  
  /*
  app.use(function(req, res, next) {
    console.log(`Worker ${process.pid} started`)
    next()
  })*/

  app.listen(process.env.PORTAPI || 8000, () => {
    //console.log(process.env.PORT)
    //console.log(process.env)
    console.log(`Express server started on port ${process.env.PORTAPI}.`)

  })

  


}
