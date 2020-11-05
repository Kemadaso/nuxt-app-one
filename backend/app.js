const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const cors = require('cors')
const model = require('./modelos')


var app = express()

// view engine setup
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')


app.use(session({
  secret            : 'something',
  resave            : false,
  saveUninitialized : true,
  cookie:{
    secure: true,
    maxAge:60000
  }

}))

var whitelist = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:7000', undefined]

//enabled cro
app.use(cors({
  origin: function (origin, callback) {
    //console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.locals.title = "something form ES6"

app.use(logger('dev'))
app.use(express.json())
app.use(require('sanitize').middleware)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// Set Router
const le = require('./routes/classse6')

//console.log(le.instance())
/*
app.use(function(req, res, next) {
  req.model = model
  next()
})*/


app.use('/aea', function(req,res,next) {

  res.json(le.instance())

})


//app.use('/', require('./routes/index'))
app.use('/api', require('./routes/api'))
app.use('/test', require('./routes/test'))

app.use(express.static(path.join(__dirname, "./public/dist/")))
app.use('/', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, './public/dist/')})
})

// catch 404 and forward to error handler


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
app.listen(process.env.PORT || 8000, () => {
  //console.log(process.env.PORT)
  console.log(`Express server started on port ${process.env.PORT}.`)
})*/



module.exports = app
