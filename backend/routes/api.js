const express = require('express')
const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')
const PostController = require('../controllers/PostController')
const TaxonomyController = require('../controllers/TaxonomyController')
const TermController = require('../controllers/TermController')
const PermissionController = require('../controllers/PermissionController')
const OptionController = require('../controllers/OptionController')
const LinkController = require('../controllers/LinkController')
let router  = express.Router()


router.get('/', async (req, res, next) => {
    
    res.json({"api":"v1"})
    
})

// router Auth
router.get('/initial', AuthController.initial)
router.get('/something', AuthController.something)



// router User
router.get('/user/all', UserController.all)
router.post('/user/create', UserController.create)
router.post('/user/update', UserController.update)
router.post('/user/delete', UserController.delete)
router.get('/user/:id', UserController.find)

//login backend panel
router.post('/user/validuserlogin', UserController.validuserlogin)
router.post('/user/exists', UserController.exists)
router.post('/user/backendcreate', UserController.backendcreate)
//router.post('/user/backendlogin', UserController.backendlogin) 
router.post('/user/backendrecoverpass', UserController.backendrecoverpass)


// router Post
router.get('/post/all', PostController.all)
router.post('/post/create', PostController.create)
router.post('/post/update', PostController.update)
router.post('/post/delete', PostController.delete)
router.get('/post/:id', PostController.find)

router.post('/post/updatefield', PostController.updatefield)





// router Taxonomy
router.get('/tax/all', TaxonomyController.all)
router.post('/tax/create', TaxonomyController.create)
router.post('/tax/update', TaxonomyController.update)
router.post('/tax/delete', TaxonomyController.delete)
router.get('/tax/:id', TaxonomyController.find)

// router Term
router.get('/term/all', TermController.all)
router.post('/term/create', TermController.create)
router.post('/term/update', TermController.update)
router.post('/term/delete', TermController.delete)
router.get('/term/:id', TermController.find)

router.post('/term/short', TermController.short)

// router permission
router.get('/permission/all', PermissionController.all)
router.post('/permission/create', PermissionController.create)
router.post('/permission/update', PermissionController.update)
router.post('/permission/delete', PermissionController.delete)

//roles
router.get('/permission/roles', PermissionController.roles)
router.get('/permission/:name', PermissionController.find)


//
router.post('/option/update', OptionController.update)
router.post('/option/delete', OptionController.delete)
router.get('/option/all', OptionController.all)


//
router.get('/link/find/:postid', LinkController.find)
router.post('/link/update', LinkController.update)
router.post('/link/delete', LinkController.delete)



module.exports = router