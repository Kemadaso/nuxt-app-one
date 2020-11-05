
exports.up = function(knex) {
  return knex.schema
    
  .createTable('term_relationships', function (table) {
      table.increments('term_relationship_id').primary()
      table.integer('term_id').notNullable()
      table.integer('post_id').notNullable()
    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("term_relationships")
};
