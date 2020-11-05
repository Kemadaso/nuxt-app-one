
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          nickname: 'aburrido001',
          password: 'qwdqwd',
          email: 'aburrido001@gmail.com',
          is_active_email: 1,
          account_status: 'active',
          roles: JSON.stringify([]),
          group_permission:'administrator'
        },
        
      ]);
    });
};
