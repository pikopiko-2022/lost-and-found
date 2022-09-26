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
      <section>
        <div className="flex justify-center items-center">
          <div>
            <button
              className="bg-[#E9896A] inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
              onClick={handleSignIn}
            >
              Sign Up
            </button>
          </div>
          <div>
            <button
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
              onClick={handleSignIn}
            >
              Log In
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage
