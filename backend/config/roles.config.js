const roles = {
  post:{
    title: 'Entrada de Post',
    description: 'permisos para las entradas de post',
    roles: {
      view: 'permiso para ver las entradas de los post',
      create: 'permiso para crear post',
      edit: 'permiso para editar un post',
      edit_others: 'permiso para editar otros post',
      delete: 'permiso para eliminar un post',
    }
  },
  term:{
    title: 'Terminos de una taxonomia',
    description: 'Permisos para la creacion , edicion, eliminar de los terminos',
    roles: {
      create: 'permiso para crear termino',
      edit: 'permiso para editar los terminos',
      delete: 'permiso para eliminar los terminos',
    }
  },
  taxonomy:{
    title: 'Taxonomias o grupo de categorias',
    description: 'Grupo de permisos para administrar las taxonomias o grupo de categorias',
    roles: {
      view: 'permiso para ver el panel de taxonomias',
      create: 'permiso para crear una taxonomia',
      edit: 'permiso para hacer cambios en las taxonomias',
      delete: 'permiso para eliminar las taxonomias',
    }
  },
  setting:{
    title: 'Permisos de configuracion del sitio',
    description: 'permisos para modificar y hacer cambios en la configuracion del sitio',
    roles: {
      view: 'permiso para ver el panel de configuracion del sitio',
      edit: 'permiso para hacer cambios en la configuracion del sitio',
    }
  },
  permission:{
    title: 'Permiso para modificar los roles',
    description: 'permisos para hacer cambios en los roles de los usuarios',
    roles: {
      view: 'permiso para ver el panel de roles en el administrador del sitio',
      edit: 'permiso para hacer cambios en los roles',
    }
  },
  comment:{
    title: 'Permisos para los Comentarios',
    description: 'los permisos de administracion de comentarios en todo el sitio web',
    roles: {
      view: 'permiso para ver el panel de comentarios',
      create: 'permiso para agregar comentarios',
      edit: 'permiso para editar los comentarios',
      edit_others: 'permiso para editar otros comentarios',
      delete: 'permiso para eliminar los comentarios',
    }
  },
  user:{
    title: 'permisos para la Administracion de User',
    description: 'los permisos de administracion de comentarios en todo el sitio web',
    roles: {
      view: 'permiso para ver el panel de usuarios',
      create: 'permiso para agregar nuevo usuario',
      edit: 'permiso para editar un usuario',
      edit_others: 'permiso para editar otros usuarios',
      delete: 'permiso para eliminar un usuario',
    }
  },
}


let compact_roles = []
for (const key in roles) {
  for (const name in roles[key].roles) {
    compact_roles.push(`${key}_${name}`)
  }
}



exports.roles = roles
exports.compact_roles = compact_roles


