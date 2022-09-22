import React, { useEffect } from 'react'
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
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            uploader={post.uploaderName}
            category={post.category}
            date={post.date}
            description={post.description}
            image={post.imageUrl}
            location={post.itemLocation}
          />
        )
      })}
    </>
  )
}
