const validate = require('../libs/customvalidator')

class user {

  constructor(conn) {
    this.knex = conn
   
    this.rules =  {
      nickname: {
        type: 'string',
        length: {
          minimum: 5,
          maximum: 200
        },
        is_unique: {
          table: 'users',
          column: 'nickname'
        }
      },
      email: {
        email: true,
        is_unique: {
          table: 'users',
          column: 'email'
        }
      },
      password: {
        type: 'string',
        length: {
          minimum: 10,
          maximum: 200
        }
      },
      repassword: {
        equality: 'password'
      },
      is_active_email: {
        type: 'integer',
        inclusion: [0,1]
      },
      account_status: {
        inclusion: ['active', 'limited', 'banned']
      },
      email_token: {
        type: 'string',
      },
      roles: {
        type: 'string',
      },
      group_permission: {
        type: 'string',
        exists_in: {
          table: 'permissions',
          column: 'name'
        }
      }
    }

  }

  async select() {
    return await this.knex.select('*').from('users')
  }

  async find(params) {
    return await this.knex.select('*').where({...params}).from('users')
  }

  async create(params) {
    params = {...params, created_at: this.knex.fn.now()}

    try {
      await validate.async(params, this.rules)

      if(params.repassword) delete params.repassword

      const id = await this.knex('users').insert({...params})
      return await this.knex('users').where('user_id', id).select('*')

    } catch (error) {
      throw error
    }
    
  }

  async save(id, params) {
    params = {...params, updated_at: this.knex.fn.now()}
    try {
      await validate.async(params, this.rules)

      if(params.repassword) delete params.repassword
      
      const update = await this.knex('users').where({user_id: id}).update({...params})
      if(!update) throw {error: `user_id ${id} no exists`}
            
      //console.log(update)
      return await this.knex('users').where('user_id', id).select('*')

    } catch (error) {
      throw error
    }

  }

  async delete(id) {
    try {
      return await this.knex('users').where({user_id: id}).del()
    } catch (error) {
      throw error
    }

  }

}

module.exports = user
