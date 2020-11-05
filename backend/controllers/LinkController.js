const model = require('../models')
const helper = require('../libs/helper')


exports.find = async function(req , res, next) {
  
  const postid = req.params.postid

  let link = await model.Link.findAll({where: {link_postID: postid}})
  //console.log(link)
  if(link) {
    let dirty = types = []
    let data = {}
    dirty = link.map(el =>  {
      
      //list types
      if(!types.includes(el.link_type)) {
        types.push(el.link_type)
      }

      try {
        el.link_group = JSON.parse(el.link_group)
      } catch (error) {
        el.link_group = {}
      }

      // get info server
      //el.link_server = helper.serverName(el.link_group.group)
      el.setDataValue('link_server', helper.serverName(el.link_group.group))
      //console.log(el.link_server)
      return el

    })


    for (const t of types) {
      data[t] = dirty.filter(el => el.link_type == t)
    }

    //console.log(data)

    res.json(data)
  } else {
    res.json([])
  }

}

exports.update = async function(req , res, next) {
  try {
    
    let link = await model.Link.findByPk(req.body.link_id)

    if(!link) {
      // create
      let data = req.body

      try {
        data.link_group = JSON.stringify(data.link_group)
      } catch (error) {
        data.link_group = JSON.stringify({})
      }

      link = await model.Link.create(data)
      link.link_group = JSON.parse(link.link_group)
      link.setDataValue('link_server', helper.serverName(link.link_group.group))
      res.json(link)

    } else {  
      // update
      if(req.body.link_group) {
        try {
          link.link_group = JSON.stringify(req.body.link_group)
        } catch (error) {
          link.link_group = JSON.stringify({})
        } 
      }
      const save = await link.save()
      save.link_group = JSON.parse(save.link_group)
      save.setDataValue('link_server', helper.serverName(save.link_group.group))

      res.json(save)
    }


  } catch (error) {
    res.json(error)
  }
}


exports.delete = async function(req , res, next) {
  try {
    let link = await model.Link.findByPk(req.body.link_id)
    if(!link) throw ({error: "link no existe"})
    await link.destroy()
    res.json({success: 'eliminado correctamente'})
  } catch (error) {
    res.json(error)
  }
}