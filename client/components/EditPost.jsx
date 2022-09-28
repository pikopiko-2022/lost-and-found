import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editPostByPostId } from '../actions/posts'

export default function EditPost() {
  const params = useParams()
  const postId = params.postId
  const posts = useSelector((state) => state.postsReducer)

  const targetPost = posts.find((post) => post.id === Number(postId))

  const initialState = {
    title: targetPost ? targetPost.title : '',
    description: targetPost ? targetPost.description : '',
    image: targetPost ? targetPost.imageUrl : '',
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialState)

  function changeHandler(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function submitHandler(event) {
    event.preventDefault()
    dispatch(editPostByPostId(formData, postId))
    setFormData(initialState)
    navigate('/')
  }
  return (
    <>
      <div className="w-full mt-1 ml-10 flex flex-col m-6">
        <h2 className="mb-5 text-2xl">Edit post</h2>
        <div className="card card-compact w-96 bg-info shadow-xl ">
          <figure>
            {targetPost && (
              <img
                className="object-cover h-48 w-96 "
                style={{ height: '400px' }}
                src={targetPost.imageUrl.substring(1)}
                alt={targetPost.title}
              ></img>
            )}
          </figure>
          <div className="p-6">
            <form>
              <div className="flex flex-row mb-1">
                <label className="mr-2 font-secondary" htmlFor="title">
                  Title of post:
                </label>
                <input
                  className="createprofile-input rounded pl-1"
                  id="title"
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  value={formData.title}
                ></input>
                <div />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  className="createprofile-input rounded pl-1"
                  type="text-area"
                  name="description"
                  onChange={changeHandler}
                  value={formData.description}
                ></input>
              </div>
              <button className="btn mt-5" onClick={submitHandler}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
