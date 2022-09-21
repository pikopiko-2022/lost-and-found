exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          uploader_id: '2',
          category: 'Found',
          title: 'Pink beanie found on Sumner Beach',
          date: '05/09/2022',
          description:
            'Please comment if you think it might be yours - tell me the brand on the tag inside',
          image_url:
            'https://static.zara.net/photos///2022/V/0/1/p/3739/002/620/2/w/1920/3739002620_6_1_1.jpg?ts=1638522328799',
          location: 'Christchurch',
        },
      ])
    })
}
