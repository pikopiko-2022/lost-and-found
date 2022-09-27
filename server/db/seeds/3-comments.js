exports.seed = function (knex) {
  return knex('comments').insert([
    {
      id: 1,
      commenter_id: '1',
      post_id: 1,
      date_commented: new Date().toDateString(),
      comment: 'I think this could be mine - I lost a Gorman one',
    },
    {
      id: 2,
      commenter_id: '1',
      post_id: 1,
      date_commented: new Date().toDateString(),
      comment: 'Never mind, I found mine!',
    },
  ])
}
