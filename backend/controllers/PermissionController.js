const model = require('../models')
const helper = require('../libs/helper')
const {compact_roles} = require('../config/roles.config.js')

exports.create = async function (req, res, next) {

	let field = req.body

	try {
		if(helper.isArrayNoEmpty(field.roles)) {
			for (const ru of field.roles) {
				if(!compact_roles.includes(ru)) throw ({error: `la regla ${ru} no existe`})
			}
		} else {
			field.roles = []
		}
	} catch (error) {
		return res.json(error) 
	}
	
	field.roles = JSON.stringify(field.roles)

	try {
		const permission = await model.Permission.create({
			name: field.name,
			roles: field.roles
		})
		res.json(permission)
	} catch (err) {
		res.json({error: err.errors[0].message})
	}

}

exports.update = async function(req, res, next) {
	
	try {
		const per = await model.Permission.findOne({where: {id: req.body.id}})
		if(!per.id) throw ({error: "el permiso no existe"})
		
		if(req.body.name) {
			per.name = req.body.name
		}

		//console.log(req.body)


		if(req.body.roles) {
			try {
				per.roles = JSON.stringify(req.body.roles)
			} catch (error) {
				//console.log(error)
				per.roles = JSON.stringify([])
			}
		}

		const result = await per.save()

		//console.log(per)
		res.json(result)
 	
		
	} catch (err) {
		
		res.json(err)
	}

}

exports.delete = async function(req, res, next) {

	try {
		const per = await model.Permission.findOne({where: {name: req.body.name}})
		//console.log(per)
		if(!per) throw ({error: "el permiso no existe"})
		per.destroy()
		res.json({success: 'se eliminio correctamente'})
		
	} catch (err) {
		res.json(err)
	}

}


exports.all = async function (req, res, next) {
	//console.log(roles)
	let per =  await model.Permission.findAll()

	per = per.map(el => {
		try {
			el.roles = JSON.parse(el.roles)
		} catch (error) {
			el.roles = []
		}
		return el
	})

	res.json(per)
	
}


exports.find = async function (req, res, next) {
	//console.log(roles)
	let per =  await model.Permission.findOne({where: {name: req.params.name}})
	try {
		per.roles = JSON.parse(per.roles)
	} catch (error) {
		per.roles = []
	}
		
	res.json(per)
	
}


exports.roles = async function(req, res, next) {
	const {roles} = require('../config/roles.config')


	//console.log(roles)
	res.json(roles)
}







