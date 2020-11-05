const helper = require('../libs/helper')
const model = require('../models')


exports.update = async function (req, res, next) {

  let todo = {}
  for(const key in req.body) {
    let opt = await model.Option.findOne({where: {option_name: key}})
    if(!opt) {
      //create
      todo[key] = await model.Option.create({
        option_name: key,
        option_value: req.body[key]
      })
    } else {
      //update
      opt.option_value = req.body[key]
      todo[key] = await opt.save()
    } 
  }

  res.json(todo)
  
}

exports.delete = async function (req, res, next) {

  try {

    let opt = await model.Option.findOne({where: {option_name: req.body.option_name}})
    if(!opt) throw {error: `field option_name ${req.body.option_name} don't exists`}
    
    const del = await opt.destroy()
    res.json(del)
  } catch (error) { 
    res.json(error)
  }
}


exports.all = async function (req, res, next) {
  //console.log(req.query)
  try {
    
    let field = req.query.option_name.split(',').map(el => el.trim())
    const result = await model.Option.findAll({where: {option_name: field}})
    if(helper.isArrayNoEmpty(result)) {
      el = {}
      for(const item of result) {
        el[item.option_name] = item.option_value
      }

      res.json(el)
    } else {
      res.json([])
    }

  } catch (error) {
    console.log(error)
    res.json(error)
  }

}