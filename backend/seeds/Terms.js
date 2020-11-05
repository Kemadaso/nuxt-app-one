
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('terms').del()
    .then(function () {
      // Inserts seed entries
      return knex('terms').insert([
        
        {taxonomy: 'genero', term_name: 'terror', term_slug: 'terror', term_status: 'active'},
        {taxonomy: 'genero', term_name: 'ciencia ficcion', term_slug: 'ciencia-ficcion', term_status: 'active'},
        {taxonomy: 'genero', term_name: 'accion', term_slug: 'accion', term_status: 'active'},
        {taxonomy: 'genero', term_name: 'comedia', term_slug: 'comedia', term_status: 'active'},
        {taxonomy: 'genero', term_name: 'animacion', term_slug: 'animacion', term_status: 'disabled'},

        {taxonomy: 'calidad', term_name: '1080p', term_slug: '1080p', term_status: 'active'},
        {taxonomy: 'calidad', term_name: '720p', term_slug: '720p', term_status: 'active'},
        {taxonomy: 'calidad', term_name: '4k', term_slug: '4k', term_status: 'active'},
        {taxonomy: 'calidad', term_name: '60fps', term_slug: '60fps', term_status: 'active'},

        {taxonomy: 'idioma', term_name: 'latino', term_slug: 'latino', term_status: 'active'},
        {taxonomy: 'idioma', term_name: 'español', term_slug: 'español', term_status: 'active'},
        {taxonomy: 'idioma', term_name: 'ingles', term_slug: 'ingles', term_status: 'active'},
        {taxonomy: 'idioma', term_name: 'subtitulado', term_slug: 'subtitulado', term_status: 'active'},


      ]);
    });
};
