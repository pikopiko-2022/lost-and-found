import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LandingPage() {
  const { loginWithRedirect } = useAuth0()
  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect()
  }
  return (
    <>
      <div className="flex flex-col w-full mt-20 justify-center items-center ">
        <div className="m-3">
          <button
            className="w-80 btn rounded btn-primary hover:opacity-80"
            onClick={handleSignIn}
          >
            Sign Up
          </button>
        </div>
        <div className="m-3">
          <button
            className="w-80 btn rounded btn-secondary hover:opacity-80"
            onClick={handleSignIn}
          >
            Log In
          </button>
        </div>
        <div className="flex flex-col justify-center items-center m-20 text-center">
          <div className="m-5 text-4xl font-light">
            <p>Lost something? Found something?</p>
          </div>
          <div className="m-5 font-secondary text-2xl text-center">
            <p>
              Lost and Found is here to help return possessions to their
              rightful owner.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
