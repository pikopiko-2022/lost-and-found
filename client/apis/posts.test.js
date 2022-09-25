import nock from 'nock'
import { getAllPostsAndComments, addPost } from './posts'

const fakePosts = [
  {
    id: 1,
    uploaderId: '3',
    category: 'Found',
    title: 'Keys',
    date: '07/06/2022',
    description: 'These have a distinct key chain, let me know what it is!',
    imageUrl: '/fakeURL',
    location: 'Hokitika',
  },
  {
    id: 2,
    uploaderId: '5',
    category: 'Lost',
    title: 'Wallet',
    date: '08/09/2022',
    description:
      "I lost my wallet, it's brown leather and should have my id in it",
    imageUrl: '/fakeURL',
    location: 'Riccarton Mall',
  },
]

describe('getAllPostsAndComments', () => {
  it('gets all posts from database through local api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/posts')
      .reply(200, fakePosts)

    return getAllPostsAndComments().then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result).toHaveLength(2)
    })
  })
})

describe('addPost', () => {
  it('adds a post to database and returns all posts in the database through local api', () => {
    const fakePost = fakePosts[1]
    const scope = nock('http://localhost')
      .post('/api/v1/posts')
      .reply(200, fakePosts)

    return addPost(fakePost).then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result[0].title).toBe('Keys')
    })
  })
})
