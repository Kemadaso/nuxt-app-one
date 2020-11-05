
const conn = require('../config/db')
const model = require('../models')
const {ValidationError} = require('sequelize');
const sequelize = model.sequelize



exports.initial = async function (req , res, next) {
    
    /*
    conn.promise().query('SELECT * FROM users').then(([rows, fields]) => {
        console.log(rows)
        res.send(rows)
    })*/

    const [rows, fields]   = await conn.promise().query('SELECT * FROM users')
    const [rows2, fields2] = await conn.promise().query('SELECT user_id, firstname FROM users')


    res.send(rows2)


}

exports.something = async function(req, res, next) {

        try {

           const result = await model.Post.create({
                post_title: "mi nueva entrada recien creada",
                post_slug: "creando un post de adeberas",
                post_content: "el contenido de mi entrada recien creada",
                post_status: "publish",
                comment_status: "open",
                post_user: 1
            })

            //console.log(result)
            //result[] = false
            res.json(result)
            
        } catch (e) {
            //console.log(error)
            //e.witherror = true,
            res.json(e)
        }
       

}

exports.login = async function(eq, res, next) {
    
}
