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
    <Route exact path="/My-Jobby-Website/register" component={RegisterForm} />
    <Route exact path="/My-Jobby-Website/login" component={LoginForm} />
    <ProtectedRoute exact path="/My-Jobby-Website/" component={Home} />
    <ProtectedRoute exact path="/My-Jobby-Website/jobs" component={Jobs} />
    <ProtectedRoute
      path="/My-Jobby-Website/jobs/:id"
      component={JobItemDetails}
    />
    <NotFound />
  </Switch>
)

export default App
