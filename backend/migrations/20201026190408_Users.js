
exports.up = function(knex) {
  return knex.schema
    
  .createTable('users', function (table) {
      table.increments('user_id').primary()
      table.string('nickname', 20).unique().notNullable()
      table.string('email', 50).unique().notNullable()
      table.string('password', 200).notNullable()
      table.integer('is_active_email').defaultTo(0).notNullable()
      table.string('account_status', 200).notNullable()
      table.string('email_token', 200)
      table.text('roles')
      table.string('group_permission', 200).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("users")
};


//exports.config = { transaction: false };
