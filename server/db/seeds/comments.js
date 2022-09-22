exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          id: 1,
          commenter_id: '1',
          post_id: 1,
          date_commented: new Date(Date.now()),
          comment: 'I think this could be mine - I lost a Gorman one',
        },
      ])
    })
}
