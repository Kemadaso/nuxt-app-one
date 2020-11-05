"use strict"
const model     = require('../models')
const helper    = require('../libs/helper')
let validate    = require('../libs/validate')
const rules     = require('../libs/rulesvalidate')


const sequelize = model.sequelize


exports.find = async function(req, res, next) {
    try {
        
        if(req.params.id == undefined) throw ({error: "parametro id no existe"})

        const tax = await model.Taxonomy.findByPk(req.params.id)

        if(helper.isObjectEmpty(tax)) throw ({error: "la taxonomia no existe"})


        let terms = await sequelize.query("SELECT * FROM terms WHERE taxonomy IN ('"+ tax.taxonomy_name +"') ORDER BY term_orden ASC ", {type: sequelize.QueryTypes.SELECT})
        
        let terms_parent = order_term_child_parent(terms)

        tax.setDataValue('terms', terms_parent)


        res.json(tax)
        
    } catch (error) {
        res.json(error)
    }
   
}

function order_term_child_parent(terms) {
    // orderna de forma jerarquica los terminos padres e hijos
    let term_child  = []
    let term_parent = []
    if(!helper.isArrayEmpty(terms)) {

        term_parent = terms.filter((term) => {
            if(term.term_parent == 0) {
                return true
            } else {
                term_child.push(term)
                return false
            }      
        
        })

        //console.log(term_parent)
        //console.log(term_child)

        term_parent = term_parent.map((term) => {
            let child = []
            for (const el of term_child) {
                if(term.term_id == el.term_parent && term.taxonomy == el.taxonomy) {
                    child.push(el)
                }
            }
            term.term_child = child
            return term

        })

    }

    return term_parent

}

exports.all = async function(req, res, next) {

    //console.log(req.queryString('order'))
    try {
        let querytax = ''
        //\const result = await model.Taxonomy.findAll()
        //let querytax = req.queryString('tax')
        if(req.queryString('tax')) {
            querytax = req.queryString('tax')
            querytax = querytax.trim().split(',').filter(e => (e != ''))
            querytax = querytax.map((e) => {
                return "taxonomy_name='"+ e +"'"
            })
        
            querytax = " WHERE " +querytax.join(' OR ')
            
        }

        let sql = "SELECT * FROM taxonomys " + querytax

        let taxs = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        if(helper.isArrayEmpty(taxs)) throw ({error: "resultado no encontrado ", sql})


        //list term

        let listaxname = taxs.map((e) => {
            return "'" + e.taxonomy_name + "'"
        })


        let terms = await sequelize.query("SELECT * FROM terms WHERE taxonomy IN ("+ listaxname.join(',') +")", {type: sequelize.QueryTypes.SELECT})
        //if(helper.isArrayEmpty(terms)) throw ({error: "resultado no encontrado ", sql})
        //console.log(terms)
        
        // function que retorna de forma jerarquica los terminos
        const term_parent = order_term_child_parent(terms)


        //vamos a ingresar los terminos dentro de las taxonomias
        
        taxs = taxs.map((e) => {
            let terms = []
            for (const el of term_parent) {
                if(el.taxonomy == e.taxonomy_name) {
                    terms.push(el)
                } 
            }
            e.terms = terms
            return e

        })
        
        res.json(taxs)

    } catch (error) {
       
        res.json({error: "no sea encontrado taxonomias"})
        
    }
}

exports.create = async function(req, res, next) {

    try {
        
        // if false throw message errors
        //const valid = await validate.async(req.body, rules.tax('create'))

        try {
            let tax = await model.Taxonomy.create({
                taxonomy_name: req.body.taxonomy_name,
                taxonomy_description: req.body.taxonomy_description
            })

            tax.setDataValue('terms', [])

            res.json(tax)

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
        
        let tax = await model.Taxonomy.findByPk(req.body.taxonomy_id)

        if(helper.isObjectEmpty(tax)) throw ({error: "taxonomia no existe"})
        //if(!rules.user(type)) throw ({error: "el tipo de accion no existe"})
        //let checked = await validate.async(req.body, rules.tax('update'))

        try {
            
            
            tax.taxonomy_name        = req.body.taxonomy_name
            tax.taxonomy_description = req.body.taxonomy_description

            tax = await tax.save()
            const success = true
            res.json({success, tax})

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
        
        let tax = await model.Taxonomy.findByPk(req.body.taxonomy_id)
        if(helper.isObjectEmpty(tax)) throw ({error: "taxonomia no existe"})
        await tax.destroy()
        res.json({success: "se elimino con exito"})
    } catch (error) {
        res.json(error)
    }
}