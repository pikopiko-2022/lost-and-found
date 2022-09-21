import { useDispatch, useSelector} from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

// import action from ./actions/
import {updateLoggedInUser} from './actions/loggedInUser'

export function useCacheUser() {
  const dispatch = useDispatch()
  const tokenInRedux = useSelector((state) => 
  Boolean(state.loggedInUser?.token)
  )

const { isAuthenticated, getAcessTokenSilently, user } = useAuth0()

  if (isAuthenticated && !tokenInRedux) {
    try {
        getAcessTokenSilently()
        .then((token) => {
            const userToSave = {
                auth0id: user?.sub,
                email: user?.email,
                token: token,
              }
              dispatch(updateLoggedInUser(userToSave))
        })
        .catch((err) => 
            console.error(err.message))
        } catch(err) {
    console.error(err)
} 

}
}