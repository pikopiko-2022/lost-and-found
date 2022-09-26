import React from 'react'
import AllPosts from './AllPosts'

//this component seems redundant - maybe just put allposts directly into the signin component?
export default function UserHomePage() {
  return (
    <>
      <AllPosts />
    </>
  )
}
