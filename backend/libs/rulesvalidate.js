const helper = require('./helper')


exports.user = function (type) {

    const opt = {
        firstname: {
            type: "string",
            presence: true,
            length: {
                minimum: 4,
                maximum: 20
            },
            exclusion: {
                within: ["nicklas"],
                message: "'%{value}' is not allowed"
            }
        },
        lastname: {
            type: "string",
            presence: true,
            length: {
                minimum: 4,
                maximum: 20
            },
            exclusion: {
                within: ["nicklas"],
                message: "'%{value}' is not allowed"
            }
        },
        password: {
            presence: true,
            equality: 'password_confirmation',
            length: {
                minimum: 4,
                maximum: 20
            }
        },
        password_confirmation: {
            presence: true,
            length: {
                minimum: 4,
                maximum: 20
            }
        },
        email: {
            email: true,
            presence: true,
            myAsyncValidator: true
        }
    }

    if(!helper.inArray(type, ['create', 'profile', 'password', 'usermeta', 'email'])) {
        return false
    }

    let rules = {}

    if(type == 'create') {
        rules.firstname              =  opt.firstname
        rules.lastname               =  opt.lastname
        rules.password               =  opt.password
        rules.password_confirmation  =  opt.password_confirmation
        rules.email                  =  opt.email

    } else if(type == 'profile') {

        rules.firstname =  opt.firstname
        rules.lastname  =  opt.lastname

    } else if(type == 'password') {

        rules.password               =  opt.password
        rules.password_confirmation  =  opt.password_confirmation

    } else if(type == 'usermeta') {
        rules.meta               =  opt.meta

    } else if (type == 'email') {
        rules.email              =  opt.email
    }

    return rules

}

exports.post = function (type) {

    const opt = {
        post_title: {
            type: "string",
            presence: true,
            length: {
                minimum: 4,
                maximum: 200
            }
        },
        post_slug: {
            type: "string",
            presence: true,
            postnameSlugValidator: true,
            length: {
                minimum: 4,
                maximum: 200
            }
        },
        post_meta: {
            type: 'typepostmeta',
            presence: false,
            
        },
        post_status: {
            presence: true,
            inclusion: ['publish', 'draft', 'trash']
        },
        comment_status: {
            presence: true,
            inclusion: ['open', 'closed']
        }
    }

    if(!helper.inArray(type, ['create', 'update', 'post_name'])) {
        return false
    }

    let rules = {}

    if(type == 'create') {
        rules.post_title              =  opt.post_title
        //rules.post_slug               =  opt.post_slug
        //rules.post_content            =  opt.post_content
        rules.post_meta               =  opt.post_meta
        rules.post_status             =  opt.post_status
        rules.comment_status          =  opt.comment_status

    } else if(type == 'update') {
        rules.post_title              =  opt.post_title
        rules.post_slug               =  opt.post_slug
        //rules.post_content            =  opt.post_content
        rules.post_meta               =  opt.post_meta
        rules.post_status             =  opt.post_status
        rules.comment_status          =  opt.comment_status

    } else if (type == 'post_name') {
        rules.post_slug               =  opt.post_slug
    }

    return rules

}

exports.term = function (type) {

    const opt = {
        term_id: {
            presence: true,
        },
        taxonomy: {
            type: "string",
            presence: true,
        },
        term_name: {
            type: "string",
            presence: true,
            length: {
                minimum: 3,
                maximum: 50
            }
        },
        term_slug: {
            postnameSlugValidator: true,
        },
        term_parent: {
            type: "integer",
            presence: false,
        },
        term_orden: {
            type: "integer",
            presence: false,
        },
        term_active: {
            presence: true,
            inclusion: ['active', 'disabled']
        }
    }

    if(!helper.inArray(type, ['create', 'update'])) {
        return false
    }

    let rules = {}

    if(type == 'create') {
        rules.taxonomy             =  opt.taxonomy
        rules.term_name            =  opt.term_name
        rules.term_slug            =  opt.term_slug
        rules.term_parent          =  opt.term_parent
        rules.term_orden           =  opt.term_orden
        rules.term_active          =  opt.term_active

    } else if(type == 'update') {
        //rules.taxonomy             =  opt.taxonomy
        rules.term_name            =  opt.term_name
        rules.term_slug            =  opt.term_slug
        rules.term_active          =  opt.term_active

    }

    return rules

}

exports.tax = function (type) {

    const opt = {
        taxonomy_id: {
            
            presence: true,
        },
        taxonomy_name: {
            type: "string",
            presence: true,
            postnameSlugValidator: true,
        },
        taxonomy_description: {
            type: "string",
            presence: false,
        }
    }

    if(!helper.inArray(type, ['create', 'update'])) {
        return false
    }

    let rules = {}

    if(type == 'create') {
        rules.taxonomy_name        = opt.taxonomy_name
        rules.taxonomy_description = opt.taxonomy_description

    } else if(type == 'update') {
        rules.taxonomy_id          = opt.taxonomy_id
        rules.taxonomy_name        = opt.taxonomy_name
        rules.taxonomy_description = opt.taxonomy_description
    }

    return rules

}