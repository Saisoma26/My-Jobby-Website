import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import RegisterForm from './components/RegisterForm'
import NotFound from './components/NotFound'
import './App.css'
import JobItemDetails from './components/JobItemDetails'

const App = () => (
  <Switch>
    <Route exact path="/register" component={RegisterForm} />
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute path="/jobs/:id" component={JobItemDetails} />
    <NotFound />
  </Switch>
)

export default App
