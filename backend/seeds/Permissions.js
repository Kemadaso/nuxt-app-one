
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('permissions').del()
    .then(function () {
      // Inserts seed entries
      return knex('permissions').insert([
        {name: 'administrator', roles: JSON.stringify(['post_create', 'post_publish'])},
        {name: 'editor', roles: JSON.stringify([])},
        {name: 'publisher', roles: JSON.stringify([])}
      ]);
    });
};
