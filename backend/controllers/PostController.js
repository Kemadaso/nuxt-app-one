"use strict"
const model     = require('../models')
const helper    = require('../libs/helper')
let validate    = require('../libs/validate')
const rules     = require('../libs/rulesvalidate')


const sequelize = model.sequelize

async function getTerm(post_id) {
    const sq = "" + `
            SELECT t.taxonomy,t.term_name,t.term_slug FROM term_relationships as tl
            LEFT JOIN terms as t
                ON t.term_id = tl.term_id
            WHERE
                tl.post_id = ${post_id}`


    try {

        let terms = await sequelize.query(sq, {type: sequelize.QueryTypes.SELECT})
        let taxs = terms.map(el => el.taxonomy)

        taxs = taxs.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })

        let send = {}

        taxs.forEach(tax => {
            send[tax] = []
            terms.forEach(term => {
                if(term['taxonomy'] == tax)
                    //delete term['taxonomy']
                    send[tax].push(term)
            })
        })

        return send

    } catch (error) {
        //console.log(error)
        return {}
    }


}

exports.find = async function(req, res, next) {
    try {

        if(req.params.id == undefined) throw ({error: "parametro id no existe"})
        let post = {}

        if(isNaN(req.params.id)) {
            post = await model.Post.findOne({where: {post_slug: req.params.id}})
        } else {
            post = await model.Post.findByPk(req.params.id)
        }

        try {
            post.post_content = JSON.parse(post.post_content)
            //console.log(post.post_content)
        } catch (error) {
            post.post_content = {}
            console.log(error)
        }


        const terms = await getTerm(post.post_id)
        // post.toJSON()
        post.setDataValue('terms', terms)

        if(helper.isObjectEmpty(post)) throw ({})

        res.json(post)

    } catch (error) {
        res.json(error)
    }

}

exports.all = async function(req, res, next) {

    try {


        let orderby, order, where, like
        let limit    = req.queryInt('per_page')
        let offset   = req.queryInt('paged')
        orderby  = helper.sanitizeString(req.queryString('orderby'))
        order    = helper.sanitizeString(req.queryString('order'))
        //like     = helper.sanitizeString(req.queryString('like'))
        where    = helper.sanitizeWhereQuery(req.queryString('where'))



        const field = [
            'post_id','post_title','post_slug','post_content', 'post_type', 'post_format',
            'post_status','comment_status','comment_count','post_user',
            'createdAt','updatedAt', 'email'
        ]


        /* where=[lastname='ga',or,firstname='davicio']  */

        let sql = "SELECT posts.*, users.email, users.firstname, users.user_id  FROM posts"

        sql += " LEFT JOIN users ON posts.post_user=users.user_id "

        if(where) {
            //if(like.length > 0)
            sql += "WHERE " + where + " "
        }



        if(helper.inArray(orderby, field)) {
            //if(typeof order === 'undefined') order = ''
            const param = (helper.inArray(order.toUpperCase(),['DESC', 'ASC']) ? order.toUpperCase() : 'DESC')
            sql += "ORDER BY posts." + orderby + " " + param + " "
        }

        let total = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})

        //if(helper.isArrayEmpty(total)) throw ({total: "resultado no encontrado "})
        total = total.length || 0


        if(offset >= 0 && limit > 0 ) {

            offset = (limit * offset) - limit

            sql += "LIMIT " + limit + " OFFSET " + offset + " "
            //sql += "" + ` LIMIT ${limit} OFFSET ${offset} `
        }


        let result = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})

        // parse json post_content
        result = result.map((el) => {
            try {

                el.post_content = el.post_content ? JSON.parse(el.post_content) : {}
                return el
            } catch (error) {
                el.post_content = {}
                return el
            }
        })


        // get all taxs => terms
        await Promise.all(result.map(async el => {
            let s = await getTerm(el.post_id)
            el.terms = s

        }))

        //console.log(sql)
        res.json({total , result})

    } catch (error) {
        console.log(error)
        if(error.original) {
            res.json({error: error.original.sqlMessage, sql: error.sql})
        } else {
            res.json(error)
        }
    }
}

exports.create = async function(req, res, next) {

    try {

        // if false throw message errors
        const valid = await validate.async(req.body, rules.post('create'))
        const  user = await model.User.findByPk(1)
        // if user no exists trhows error
        if(helper.isObjectEmpty(user)) throw ({error: "usuario no existe"})


        try {

            let post = {}

            post.post_title = req.body.post_title
            post.post_slug = req.body.post_slug
            post.post_content = req.body.post_content
            post.post_meta = req.body.post_meta
            post.post_status = req.body.post_status
            post.comment_status = req.body.comment_status
            post.comment_count = 0
            post.post_user = user.user_id

            try {
                post.post_content   = JSON.stringify(req.body.post_content)
            } catch (error) {
                post.post_content = {}
                //console.log(error)
            }

            post = await model.Post.create(post)


            await updateterm(req.body.terms['genero'], 'genero', post.post_id)
            await updateterm(req.body.terms['calidad'], 'calidad', post.post_id)
            await updateterm(req.body.terms['audio'], 'audio', post.post_id)

            //console.log(post)

            res.json(post)

        } catch (error) {
            res.json({"error": error.errors[0].message})
        }


    } catch (error) {
        //console.log(error)
        res.json(error)
    }


}


async function updateterm(terms, tax, post_id) {

    if(tax) {
        const sql = `
        DELETE term_relationships FROM term_relationships
        LEFT JOIN terms
            ON terms.term_id = term_relationships.term_id
        WHERE
            term_relationships.post_id = ${post_id} AND terms.taxonomy = '${tax}' `

        await sequelize.query(sql)
        //console.log(metadata)
    }

    if(Array.isArray(terms) && terms.length) {

        terms = terms.map(el => {
            return `(t.term_slug = '${el}' AND t.taxonomy = '${tax}')`
        })

        const sql = `
                INSERT INTO term_relationships (term_id, post_id)
                SELECT t.term_id, ${post_id} FROM terms t
                WHERE
                    ${terms.join(' OR ')}
            `

        let [result, metadata] = await sequelize.query(sql)
        //console.log(metadata)

        return result

    }

}

exports.update = async function(req, res, next) {

    //const type = req.query.type
    try {
        console.log(req.body)
        let post = await model.Post.findByPk(req.body.post_id)

        if(helper.isObjectEmpty(post)) throw ({error: "post no existe"})
        //if(!rules.user(type)) throw ({error: "el tipo de accion no existe"})
        let checked = await validate.async(req.body, rules.post('update'))

        try {

            post.post_title     = req.body.post_title
            post.post_slug      = req.body.post_slug
            post.post_meta      = req.body.post_meta
            post.post_status    = req.body.post_status
            post.comment_status = req.body.comment_status

            try {
                post.post_content   = JSON.stringify(req.body.post_content)
            } catch (error) {
                post.post_content = {}
                console.log(error)
            }

            await updateterm(req.body.terms['genero'], 'genero', post.post_id)
            await updateterm(req.body.terms['calidad'], 'calidad', post.post_id)
            await updateterm(req.body.terms['audio'], 'audio', post.post_id)





            post = await post.save()

            //const t = req.body.post_title
            res.json(req.body)

        } catch (error) {
            res.json({error: error.errors[0].message})
        }

    } catch (error) {
        //console.log(error)
        res.json(error)
    }

}

exports.updatefield = async function(req, res, next) {

    //const type = req.query.type
    try {
        //console.log(req.body)
        let post = await model.Post.findByPk(req.body.post_id)

        if(helper.isObjectEmpty(post)) throw ({error: "post no existe"})
        //if(!rules.user(type)) throw ({error: "el tipo de accion no existe"})
        //let checked = await validate.async(req.body, rules.post('update'))

        try {

            if(req.body.post_title) {
                post.post_title = req.body.post_title
            }

            if(req.body.post_slug) {
                post.post_slug = req.body.post_slug
            }

            if(req.body.post_meta) {
                post.post_meta = req.body.post_meta
            }

            if(req.body.post_status) {
                post.post_status = req.body.post_status
            }

            if(req.body.comment_status) {
                post.comment_status = req.body.comment_status
            }

            if(req.body.post_content) {
                try {
                    post.post_content = JSON.stringify(req.body.post_content)
                } catch (error) {
                    post.post_content = {}
                }
            }


            post = await post.save()

            //await updateterm(req.body.terms['genero'], 'genero', post.post_id)
            //await updateterm(req.body.terms['calidad'], 'calidad', post.post_id)
            //await updateterm(req.body.terms['audio'], 'audio', post.post_id)

            //const t = req.body.post_title
            res.json(req.body)

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

        let post = await model.Post.findByPk(req.body.post_id)
        if(helper.isObjectEmpty(post)) throw ({error: "post no existe"})
        res.json({success: "se elimino con exito"})
    } catch (error) {
        res.json(error)
    }
}
