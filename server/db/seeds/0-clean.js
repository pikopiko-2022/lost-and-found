exports.seed = async (knex) => {
  await knex('comments').del()
  await knex('posts').del()
  await knex('users').del()
}
