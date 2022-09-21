import React, { useState, useEffect } from 'react'
import { getAllPosts } from '../apis/posts'

export default function UserHomePage() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getAllPosts()
      .then((result) => {
        setPosts(result)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <p>UserHomePage</p>
      {posts.map((post) => {
        return <div key={post.id}>{post.title}</div>
      })}
    </>
  )
}
