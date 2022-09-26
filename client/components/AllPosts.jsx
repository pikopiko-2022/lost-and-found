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
      <Link to="/createPost">
        <button>Create a post</button>
      </Link>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            uploaderId={post.uploaderId}
            title={post.title}
            uploader={post.username}
            category={post.category}
            date={post.date}
            description={post.description}
            image={post.imageUrl}
            location={post.itemLocation}
            comments={post.comments}
          />
        )
      })}
    </>
  )
}
