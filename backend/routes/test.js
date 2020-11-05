
const express = require('express')
const controllers = require('../controllers/AuthController')
const model = require('../models')
const le = require('./classse6')
const user = require('./../models/modelmysql/User')
const { async } = require('validate.js')

const sequelize = model.sequelize
let router  = express.Router()

const modelo = require('../modelos')

/* Constructor Details Api  */

router.get('/dbcreate', async (req, res, next) => {
    let user = null
    //const users = await User.findAll()
    let action = await model.Link.sync({force: true})
    
    //sequelize.sync({force: true})
    res.json({all: 'action'})

})

router.get('/post', async (req, res, next) => {
   
    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low)
    }
   
    let crea = await model.Post.create({
        post_title: "el titulo de mi post",
        post_slug: "mi-primer-post-" + randomInt(1, 100000),
        post_content: "el contenido de mi entrada recien creada",
        post_status: "publish",
        comment_status: "open",
        post_user: 1,

   })

   let result = await model.Post.findAll()
    
    res.json(result)

})

router.get('/getall', async (req, res, next) => {
   
    //const users = await User.findAll()

    let ress = await model.User.findByPk(1)
    let all = await model.User.findAll()
    let select = await sequelize.query("SELECT * FROM users;")
    let where = await model.User.findAll({where: {user_id: 1}})
    res.json({ress, all, select, where})

})

/*
router.get('/', (req,res, next) => {
    res.send('some')
});*/

router.get('/users', async (req, res) => {
    
    const [rows, fields]   = await conn.promise().query('SELECT * FROM users')
    //res.header("Access-Control-Allow-Origin", "*");
    res.json(rows)

})

router.get('/user/:userid', async (req, res) => {
    
    const [rows, fields]   = await conn.promise().query('SELECT * FROM users WHERE user_id=' + req.params.userid)
    //res.header("Access-Control-Allow-Origin", "*");
    res.json(rows[0])

})


router.get('/auth', controllers.initial)

router.get('/roles', async (req, res, next) => {

    const asroles = await model.User.hasRoles(['post_create', 'post_view'])
    const getroles = await model.User.getRoles()
    const getgroup = await model.User.getGroup()
    const active   = await model.User.hasActiveAccount()

    res.json({asroles,getroles,getgroup, active})

})

router.get('/aea', async (req, res, next) => {

    res.json(le.instance())

})

router.get('/static', async(req, res , next) => {

    try {
      const aea = await user.getUser()
      res.json(aea)
    } catch (error) {
      console.log(error)
      res.json(error)
    }

})


router.get('/model', async (req, res, next) => {

  const result = await modelo.user.select()
  //console.log(result)
  res.json(result)

})

router.get('/modelcreate', async (req, res, next) => {

  try {
    const result = await modelo.user.create({
      nickname: 'aeamano', 
      email: "simple001gmail.com",
      password: "aea nomas te voy a decir",
      repassword: "aea nomas te voy a decir",
      is_active_email: 1,
      account_status: 'active',
      email_token: 'qwdqwd',
      roles: JSON.stringify([]),
      group_permission: 'editor'
    })
    res.json(result)
  } catch (error) {
    res.json(error)
  }

})

router.get('/modelupdate', async (req, res, next) => {

  try {
    const result = await modelo.user.save(4, {
      nickname: 'aburrido', 
      group_permission: 'editor'
    })
    res.json(result)

  } catch (error) {
    res.json(error)
  }

})

//The optional chaining operator (?.) 
//Nullish Coalescing  const a = false ?? 10 // returns false

router.get('/sil', async (req, res , next) => {

  res.json([])

})


module.exports = router