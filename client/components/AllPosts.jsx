import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import Post from './Post'

export default function AllPosts() {
  const posts = useSelector((state) => state.postsReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              uploaderId={post.uploaderId}
              title={post.title}
              uploader={post.username}
              category={post.category}
              dateLostOrFound={post.date_lostOrFound}
              datePosted={post.datePosted}
              description={post.description}
              image={post.imageUrl}
              location={post.itemLocation}
              comments={post.comments}
            />
          )
        })}
      </div>
      <div className="flex justify-end ml-24">
        <Link to="/createPost">
          <button className="btn mr-3 sticky top-20  w-40 rounded btn-primary">
            Create a post
          </button>
        </Link>
      </div>
    </>
  )
}
