exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.increments('id')
    table.string('name')
    table.string('username')
    table.string('email')
    table.string('location')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
