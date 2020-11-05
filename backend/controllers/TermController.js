"use strict"
const model     = require('../models')
const helper    = require('../libs/helper')
let validate    = require('../libs/validate')
const rules     = require('../libs/rulesvalidate')
const { async } = require('../libs/validate')


const sequelize = model.sequelize


exports.find = async function(req, res, next) {
    try {
        
        if(req.params.id == undefined) throw ({error: "parametro id no existe"})

        const term = await model.Term.findByPk(req.params.id)

        if(helper.isObjectEmpty(term)) throw ({error: "el termino no existe"})

        res.json(term)
        
    } catch (error) {
        res.json(error)
    }

}


exports.all = async function(req, res, next) {

    //console.log(req.queryString('order'))
    const depth  = 1
    try {

        const field = ['term_id','taxonomy','term_name','term_slug','term_parent','term_orden','term_active']


        let sql   = "SELECT "+ field.join(',') +" FROM terms "
        let column = {}
        
        
        column['taxonomy'] = req.queryString('taxonomy')

        //console.log(req.query)

        //console.log( "result de taxonomy "+ req.queryString('taxonomy'))

        if(helper.inArray(req.queryString('active'), ['active', 'disabled'])) 
            column['term_active'] = req.queryString('active')
        else
            column['term_active'] = 'active'

        //console.log(column)
        
        let columnr = Object.entries(column).map((item) => {
            return item[0] + "='"+ item[1] +"'"
        })

        sql += " WHERE " + columnr.join(" AND ")


        
            
        let result = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        if(helper.isArrayEmpty(result)) throw ({error: "resultado no encontrado ", sql})

       //process
        //let term_parent = []
        let term_child  = []

        let term_parent = result.filter((term) => {
            if(term.term_parent == 0) {
                return term
            } else {
                term_child.push(term)
            }      
           
        })

        //console.log(term_parent)
        //console.log(term_child)

        let term = term_parent.map((term) => {
            let child = []
            for (const key in term_child) {
                if(term.term_id == term_child[key].term_parent) {
                    child.push(term_child[key])
                }
            }
            term.term_child = child
            return term

        })

        res.json({sql, term})

    } catch (error) {
    
        res.json({error: error})

    }
}

exports.create = async function(req, res, next) {

    try {

        req.body.term_parent = parseInt(req.body.term_parent) ? req.body.term_parent : 0
        req.body.term_orden  = parseInt(req.body.term_orden) ? req.body.term_orden : 0
        
        // if false throw message errors
        //const valid = await validate.async(req.body, rules.term('create'))

        try {
            let tax = await model.Term.create({
                taxonomy: req.body.taxonomy,
                term_name: req.body.term_name,
                term_slug: req.body.term_slug,
                term_parent: req.body.term_parent,
                term_orden: req.body.term_orden,
                term_active: req.body.term_active
            })

            const success = true

            res.json({success, tax})

        } catch (error) {
            res.json({"error": error.errors[0].message})
        }
        

    } catch (error) {
        //console.log(error)
        res.json(error)
    }


}


exports.update = async function(req, res, next) {
    
    //const type = req.query.type
    try {

        req.body.term_parent = parseInt(req.body.term_parent)
        req.body.term_orden  = parseInt(req.body.term_orden)
       


        
        let term = await model.Term.findByPk(req.body.term_id)

        if(helper.isObjectEmpty(term)) throw ({error: "term no existe"})
        //if(!rules.user(type)) throw ({error: "el tipo de accion no existe"})
        //let checked = await validate.async(req.body, rules.term('update'))

        try {
            
            if(req.body.term_name) {
                term.term_name = req.body.term_name
            }
            if(req.body.term_slug) {
                term.term_slug = req.body.term_slug
            }
            
            if(req.body.term_active) {
                term.term_active = req.body.term_active
            }
            

            term = await term.save()
            const success = true
            res.json({success, term})

        } catch (error) {
            res.json({error: error.errors[0].message})
        }
            
    } catch (error) {
        //console.log(error)
        res.json(error)
    }

}

exports.delete = async function(req, res, next) {
    try {
        
        let term = await model.Term.findByPk(req.body.term_id)
        if(helper.isObjectEmpty(term)) throw ({error: "termino no existe"})
        term.destroy()
        res.json({success: "se elimino con exito"})
    } catch (error) {
        res.json(error)
    }
}

exports.short = async function(req, res, next) {
    //term_orden
    //term_id
    console.log('entrando al orden')
    //res.json(req.body.orden)
    let send = []

    if(!helper.isArrayEmpty(req.body.orden)) {
        await Promise.all(req.body.orden.map(async (el) => {
            try {
                let term = await model.Term.findByPk(el.term_id)
                term.term_orden = el.term_orden
                term.save()
                //console.log(term.toJSON())
            } catch(err) {
                console.log(err)
            }

        }))
    }

    res.json(send)


    


}