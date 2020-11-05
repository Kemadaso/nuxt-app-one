
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('taxonomys').del()
    .then(function () {
      // Inserts seed entries
      return knex('taxonomys').insert([
        {taxonomy_name: 'genero', taxonomy_description: ''},
        {taxonomy_name: 'idioma', taxonomy_description: ''},
        {taxonomy_name: 'calidad', taxonomy_description: ''},
        {taxonomy_name: 'tag_cast', taxonomy_description: ''},
        {taxonomy_name: 'tag', taxonomy_description: ''}
      ]);
    });
};
