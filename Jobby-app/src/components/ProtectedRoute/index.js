import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const accessToken = Cookies.get('jwt_token')
  console.log('protected route:', accessToken)
  if (accessToken === undefined) {
    console.log('going to login page')
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
