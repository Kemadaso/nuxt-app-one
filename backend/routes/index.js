var express = require('express')
var router = express.Router()
const model = require('../models')
const helper = require('../libs/helper')
const validate = require('../libs/validate')
var jwt = require('jsonwebtoken')
//const { route } = require('./users')

/* post method */

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})

/* GET home page. */
router.get('/', function (req, res, next) {


  //console.log(req.route)

  //res.cookie('inicio', '/')

  //res.cookie('cart', { items: [1, 2, 3] })

  //console.log(req.cookies)

  //console.dir(app.locals.title)  

  console.log(req.app.locals.title)

  res.locals.user = "executando algo"

  res.render('index', { title: 'Express', body: req.params.getsome });


  //req.session.views = 1

});

/* GET home page. */
router.post('/enviar', function (req, res, next) {


  console.log(req.body)

  res.json({ requestBody: req.body.other })



});

/* GET home page. */
router.get('/prueba', function (req, res, next) {


  console.log(req.params)

  res.json({ requestBody: req.query.some })



});



router.get('/db', function (req, res, next) {

  const conn = require('../config/db')

  conn.query('SELECT * FROM users', function (err, results, fields) {

    res.set('Content-Type', 'text/json')
    res.send(results)

  })


});

router.get('/db2', function (req, res, next) {

  const conn = require('../config/db')

  conn.promise().query('SELECT * FROM users').then(([rows, fields]) => {
    console.log(rows)
    res.send(rows)
  })


})

router.get('/db2', function (req, res, next) {

  const conn = require('../config/db')

  conn.promise().query('SELECT * FROM users').then(([rows, fields]) => {
    console.log(rows)
    res.send(rows)
  })


})

router.post('/validationtoken', (req, res, next) => {

  var fs = require('fs')
  var path = require('path');
  let keyp = fs.readFileSync(path.join(__dirname, '../config/public.key'))
  //console.log(keyp)
  //console.log(req.headers.user_access_token)

  const token = req.headers["user_access_token"]
  console.log('server token => ',token)

  jwt.verify(token, keyp, function (error, decoded) {
    if (decoded) {
      res.send(decoded)
    } else {
      res.send({error})
    }

  });

})

router.post('/login', async function (req, res, next) {
  try {
    let user = {}
    if(validate.validEmail(req.body.login)) {
      user = await model.User.findOne({ where: { email: req.body.login } })
    } else {
      user = await model.User.findOne({ where: { nickname: req.body.login } })
    }

    const roles = await model.User.getRoles(user.user_id)

    //console.log(user)

    const match = await helper.decrypt(req.body.password, user.password)
    if (match) {
      
      var fs = require('fs')
      var path = require('path');
      let keyp = fs.readFileSync(path.join(__dirname, '../config/private.key'))

      //console.log(keyp)
      //"2 days", "10h", "7d"
      let s = jwt.sign({
        user_id: user.user_id,
        email: user.email,
        nickname: user.nickname,
        group_permission: user.group_permission,
        roles: roles
      }, keyp, { algorithm: 'RS256', expiresIn: 6 * 60 * 60 }, function (error, user_access_token) {
        if(error) {
          res.json({error})
        } else {
          res.json({ user_access_token })
        }
        
      })

    } else {
      res.json({ error: "usuario o contraseña incorrectos" })
    }

  } catch (error) {
    console.log(error)
    res.json({error: error})
  }

})


module.exports = router
