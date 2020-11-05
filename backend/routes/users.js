var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource aa')
  console.log()
});



router.get('/some', function(req, res, next) {
 
  console.log(req.body)
  res.send("response with a resource aa a")
})

module.exports = router;
